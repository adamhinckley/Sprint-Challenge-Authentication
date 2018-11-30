import React, { Component } from "react";
import axios from "axios";

const initialUser = {
  username: "",
  password: ""
};

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      user: { ...initialUser },
      message: ""
    };
  }

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ user: { ...this.state.user, [name]: value } });
  };

  submitHandler = e => {
    e.preventDefault();
    // const endpoint = process.env.REACT_APP_API_URL;
    // console.log(endpoint);
    axios
      .post("http://localhost:3300/api/register", this.state.user)
      .then(res => {
        if (res.status === 201) {
          this.setState({
            user: { ...initialUser },
            message: "registration successful!"
          });
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        this.setState({
          user: { ...initialUser },
          message: "registration failed"
        });
      });
  };

  render() {
    return (
      <div>
        <div>
          <h1>Register</h1>
        </div>
        <form onSubmit={this.submitHandler}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" value={this.state.username} onChange={this.changeHandler} />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.changeHandler}
          />
          <button type="submit">Register</button>
        </form>
        <div>
          <h3>{this.state.message}</h3>
        </div>
      </div>
    );
  }
}
