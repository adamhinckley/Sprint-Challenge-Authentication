import React, { Component } from "react";
import "./App.css";
import { Route, NavLink } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import DadJokes from "./components/DadJokes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink to="/">Home</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/dad-jokes">Dad Jokes</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/login">Login</NavLink>
          </nav>
          <section>
            <Route exact path="/" component={Register} />
            <Route path="/dad-jokes" component={DadJokes} />
            <Route path="/login" component={Login} />
          </section>
        </header>
      </div>
    );
  }
}

export default App;
