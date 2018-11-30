const axios = require("axios");
const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig");

const { authenticate } = require("./middlewares");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

function register(req, res) {
  //get username and password
  creds = req.body;
  //generate hash
  const hash = bcrypt.hashSync(creds.password, 10);
  //override pass with hash
  creds.password = hash;
  db("users")
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => json({ message: "Error adding user to the database", err }));
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  axios
    .get("https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten")
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
