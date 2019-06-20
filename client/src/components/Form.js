import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { loginUser, registerUser } from "../actions";

const DIV = styled.div`
  display: flex;
  justify-content: center;
`;
const FORM = styled.form`
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  width: 25%;
  margin: 0 auto;
  /* background: #efeff3; */
  padding: 2rem 2rem;
  border-radius: 5px;
  box-shadow: #999 1px 2px 5px;

  div {
    /* padding-bottom: 12px; */

    input {
      /* width: 280px; */
      width: 100%;
      font-size: 1rem;
      margin-bottom: 1rem;
      border: 1px solid lightgray;
      border-radius: 3px;
      height: 30px;
      padding-left: 10px;
      outline: none;
      &::placeholder {
        color: lightgray;
      }
    }
    button {
      padding: 0.5rem 0.5rem;
      background: #234890;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
      outline: none;
      border: none;
      border-radius: 3px;
      &:hover {
        color: #234890;
        background: #fff;
      }
    }
  }

  .login {
    display: flex;
    justify-content: center;
    button {
      width: 100%;
    }
  }
`;

class Form extends Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.loginUser(this.state.credentials);
  };
  render() {
    return (
      <DIV>
        <FORM onSubmit={this.handleSubmit}>
          <div className="username">
            <input
              onChange={this.handleChange}
              type="text"
              placeholder="username"
              name="username"
              value={this.state.credentials.username}
            />
          </div>
          <div className="password">
            <input
              onChange={this.handleChange}
              type="password"
              placeholder="password"
              name="password"
              value={this.state.credentials.password}
            />
          </div>
          <div className="login">
            <button type="submit">Login</button>
          </div>
        </FORM>
      </DIV>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { loginUser, registerUser }
)(Form);
