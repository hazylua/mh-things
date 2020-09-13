import React, { useState } from "react";
import { Container, Form, Col, Button } from "react-bootstrap";

import AuthenticationService from "../services/AuthenticationService";

const RegisterPage = () => {
  const [isSending, setIsSending] = useState(false);
  const [resMsg, setResMsg] = useState(``);
  var [registerForm, setRegisterForm] = useState({
    user: "",
    password: "",
  });

  const handleRegister = async () => {
    if (isSending) return;
    else {
      setIsSending(true);
      try {
        const response = await AuthenticationService.register({
          email: registerForm.user,
          password: registerForm.password,
        });
        setResMsg(`Registration succesful.`);
      } catch (error) {
        if (error.response) setResMsg(error.response.data.error);
        else
          setResMsg(
            `There was an error with the server. Please try again later.`
          );
      }
      setIsSending(false);
    }
  };

  return (
    <Container>
      <Col className="content-panels" style={{ marginRight: "10px" }}>
        <h2>Sign Up</h2>
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