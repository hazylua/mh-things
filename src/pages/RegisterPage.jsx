import React, { useState } from "react";
import { Container, Form, Col, Button } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";

import AuthenticationService from "../services/AuthenticationService";

const RegisterPage = () => {
  const [isSending, setIsSending] = useState(false);
  const [resMsg, setResMsg] = useState(``);
  var [registerForm, setRegisterForm] = useState({
    user: "",
    password: "",
  });

  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const handleRegister = async () => {
    if (isSending) return;
    else {
      setIsSending(true);
      try {
        const response = await AuthenticationService.register({
          email: registerForm.user,
          password: registerForm.password,
        });
        await dispatch({
          payload: response.data,
          type: "SET_TOKEN",
        });
        setResMsg(`Registration succesful.`);
      } catch (error) {
        if (error.response) setResMsg(error.response.data.error);
        else
          setResMsg(
            `There was an error with the server. Please try again later.
            <br/>
            Error info:
            <br/>
            <b>${error}</b>
            `
          );
      }
      setIsSending(false);
    }
  };

  return (
    <Container>
      <h2>Sign Up</h2>
      <Col className="content-panels" style={{ marginRight: "10px" }}>
        <p>
          In the future you'll be able to register if you'd like to attach saved
          sets and preferences to an account.
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

        <Button
          variant="primary"
          type="submit"
          disabled={isSending}
          style={{ marginBottom: "20px" }}
          onClick={handleRegister}
        >
          Register
        </Button>
        <div
          style={{ textAlign: "center" }}
          dangerouslySetInnerHTML={{ __html: resMsg }}
        ></div>
      </Col>
    </Container>
  );
};

export default RegisterPage;
