const axios = require("axios");
const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig");
const jwtKey = require("../_secrets/keys").jwtKey;
const jwt = require("jsonwebtoken");

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

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const secret = jwtKey;
  const options = {
    expiresIn: "10m"
  };
  return jwt.sign(payload, secret, options);
}

function login(req, res) {
  const creds = req.body;
  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(201).json({ message: "Welcome", token });
      } else {
        res.status(201).json({ message: "not authorized" });
      }
    })
    .catch(err => res.send({ message: "not authorized", err }));
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
