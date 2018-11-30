import React, { Component } from "react";
import axios from "axios";

export default class DadJokes extends Component {
  constructor() {
    super();
    this.state = {
      jokes: []
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    console.log(token);
    const options = {
      headers: {
        Authorization: token
      }
    };
    axios
      .get("http://localhost:3300/api/jokes", options)
      .then(res => {
        this.setState({ jokes: res.data });
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  render() {
    return (
      <div>
        <h3>Check out these Dad jokes</h3>
        <div>
          {this.state.jokes.map(joke => {
            console.log(joke);
            return (
              <div>
                <p key={joke.id}>{joke.setup}</p>
                <p>{joke.punchline}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
