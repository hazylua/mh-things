import React, { useState, useCallback } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";

import AuthenticationService from "../services/AuthenticationService";
import RegisterRequest from "../components/RegisterRequest";
import LoginRequest from "../components/LoginRequest";

const Register = () => {
  var [userEmail, setUserEmail] = useState("");
  var [userPassword, setUserPassword] = useState("");
  var [loginEmail, setLoginEmail] = useState("");
  var [loginPassword, setLoginPassword] = useState("");

  return (
    <Container>
      <Row>
        {/* Sign Up */}
        <Col className="content-panels" style={{ marginRight: "10px" }}>
          <h2>Sign Up</h2>
          <p>
            In the future you'll be able to register if you'd like to attach
            saved sets and preferences to an account.
          </p>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              label="Email"
              type="email"
              placeholder="Enter your e-mail address"
              onChange={(e) => setUserEmail((userEmail = e.target.value))}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              tvalue={userPassword}
              label="Password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setUserPassword((userPassword = e.target.value))}
            />
          </Form.Group>

          <RegisterRequest
            email={userEmail}
            pw={userPassword}
            key={userEmail}
          ></RegisterRequest>
        </Col>
        {/* Sign In */}
        <Col className="content-panels" style={{ marginLeft: "10px" }}>
          <h2>Sign In</h2>
          <p>Login with your registered information.</p>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              label="Email"
              type="email"
              onChange={(e) => setUserEmail((loginEmail = e.target.value))}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              tvalue={userPassword}
              label="Password"
              type="password"
              onChange={(e) =>
                setUserPassword((loginPassword = e.target.value))
              }
            />
          </Form.Group>

          <LoginRequest
            email={userEmail}
            pw={userPassword}
            key={userEmail}
          ></LoginRequest>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
