import React, { Component } from "react";
import styled from "styled-components";

const DIV = styled.div`
  display: flex;
  justify-content: center;
`;
const FORM = styled.form`
  background-color: red;
  padding: 2rem;
`;

class Form extends Component {
  render() {
    return (
      <DIV>
        <FORM>
          <div className="username">
            <input type="text" />
          </div>
          <div className="password">
            <input type="password" />
          </div>
        </FORM>
      </DIV>
    );
  }
}

export default Form;
