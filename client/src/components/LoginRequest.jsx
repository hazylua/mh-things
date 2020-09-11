import React, { useState, useCallback } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";

import AuthenticationService from "../services/AuthenticationService";

import { connect } from "react-redux";

const LoginRequest = (props) => {
  const [isSending, setIsSending] = useState(false);
  const [resMsg, setResMsg] = useState(``);
  const sendRequest = useCallback(async () => {
    if (isSending) return;
    setIsSending(true);
    try {
      const response = await AuthenticationService.login({
        email: props.email,
        password: props.pw,
      }).then(() => {
        setResMsg(`<p>Login successful.</p>`);
      });
    } catch (error) {
      setResMsg(error.response.data.error);
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
        style={{ marginBottom: "20px" }}
        onClick={sendRequest}
      >
        Login
      </Button>
      <div
        style={{ textAlign: "center" }}
        dangerouslySetInnerHTML={{ __html: resMsg }}
      ></div>
    </React.Fragment>
  );
};

export default connect(null)(LoginRequest);
