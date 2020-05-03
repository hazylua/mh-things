import React, { Component } from "react";
import AuthenticationService from "../services/AuthenticationService";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userPassword: "",
      errorMessage: ``,
    };
  }

  async registerUser() {
    try {
      await AuthenticationService.register({
        email: this.state.userEmail,
        password: this.state.userPassword,
      });
    } catch (error) {
      this.setState({
        errorMessage: error.response.data.error,
      });
    }
  }

  getUserName = (e) => {
    this.setState({
      userEmail: e.target.value,
    });
  };

  getUserPassword = (e) => {
    this.setState({
      userPassword: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <h1 className="page-title">Register</h1>
        <input
          value={this.state.userName}
          className="register-input"
          type="email"
          onChange={this.getUserName}
        ></input>

        <input
          value={this.state.userPassword}
          className="register-input"
          type="password"
          onChange={this.getUserPassword}
        ></input>

        <button
          className="register-button"
          onClick={this.registerUser.bind(this)}
        >
          Register
        </button>
        <div
          style={{ textAlign: "center", color: "red" }}
          dangerouslySetInnerHTML={{ __html: this.state.errorMessage }}
        ></div>
      </div>
    );
  }
}
