import React, { useState } from "react";
import { Container, Form, Col, Button } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";

import AuthenticationService from "../services/AuthenticationService";

const LoginPage = () => {
  const [isSending, setIsSending] = useState(false);
  const [resMsg, setResMsg] = useState(``);
  var [loginForm, setLoginForm] = useState({
    user: "",
    password: "",
  });

  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (isSending) return;
    else {
      setIsSending(true);
      try {
        const response = await AuthenticationService.login({
          email: loginForm.user,
          password: loginForm.password,
        });
        await dispatch({
          payload: response.data,
          type: "SET_TOKEN",
        });
        setResMsg(`Login succesful.`);
      } catch (error) {
        if (error.response) setResMsg(error.response.data.error);
        else
          setResMsg(
            `There was an error with the server. Please try again later.
            <br/>
            Error info:
            <br/>
            ${error}
            `
          );
      }
      setIsSending(false);
    }
  };

  return (
    <Container>
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

        <Button
          variant="primary"
          type="submit"
          disabled={isSending}
          style={{ marginBottom: "20px" }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <div
          style={{ textAlign: "center" }}
          dangerouslySetInnerHTML={{ __html: resMsg }}
        ></div>
      </Col>
    </Container>
  );
};

export default LoginPage;
