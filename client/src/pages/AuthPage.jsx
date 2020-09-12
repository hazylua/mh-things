import React, { useState } from "react";
import { Container, Form, Col, Row } from "react-bootstrap";

import RegisterRequest from "../components/RegisterRequest";
import LoginRequest from "../components/LoginRequest";

const Authentication = () => {
  var [registerForm, setRegisterForm] = useState({
    user: "",
    password: "",
  });
  var [loginForm, setLoginForm] = useState({
    user: "",
    password: "",
  });

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
              onChange={(e) =>
                setRegisterForm({ ...registerForm, user: e.target.value })
              }
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              tvalue={registerForm.password}
              label="Password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) =>
                setRegisterForm({ ...registerForm, password: e.target.value })
              }
            />
          </Form.Group>

          <RegisterRequest form={registerForm}></RegisterRequest>
        </Col>

        {/* Sign In */}
        <Col className="content-panels" style={{ marginLeft: "10px" }}>
          <h2>Sign In</h2>
          <p>Login with your user information.</p>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              label="Email"
              type="email"
              onChange={(e) =>
                setLoginForm({ ...loginForm, user: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              tvalue={loginForm.password}
              label="Password"
              type="password"
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
            />
          </Form.Group>

          <LoginRequest form={loginForm}></LoginRequest>
        </Col>
      </Row>
    </Container>
  );
};

export default Authentication;
