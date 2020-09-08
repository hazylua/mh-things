import React, { useState, useCallback } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";

import AuthenticationService from "../services/AuthenticationService";

const SendRequest = (props) => {
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState(``);
  const sendRequest = useCallback(async () => {
    if (isSending) return;
    setIsSending(true);
    try {
      await AuthenticationService.register({
        email: props.email,
        password: props.pw,
      });
      setErrorMsg(`<p>Registration complete.</p>`);
    } catch (error) {
      setErrorMsg(error.response.data.error);
      setIsSending(false);
    }
    setIsSending(false);
  }, [isSending]);

  return (
    <React.Fragment>
      <Button
        variant="primary"
        type="submit"
        disabled={isSending}
        onClick={sendRequest}
      >
        Register
      </Button>
      <div
        style={{ textAlign: "center" }}
        dangerouslySetInnerHTML={{ __html: errorMsg }}
      ></div>
    </React.Fragment>
  );
};

const Register = () => {
  var [userEmail, setUserEmail] = useState("");
  var [userPassword, setUserPassword] = useState("");

  return (
    <Container>
      <Col>
        <h2>Register</h2>
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

        <SendRequest
          email={userEmail}
          pw={userPassword}
          key={userEmail}
        ></SendRequest>
      </Col>
    </Container>
  );
};

export default Register;
