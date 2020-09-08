import React, { useState, useCallback } from "react";
import { Button } from "react-bootstrap";

import AuthenticationService from "../services/AuthenticationService";

const RegisterRequest = (props) => {
  const [isSending, setIsSending] = useState(false);
  const [resMsg, setResMsg] = useState(``);
  const sendRequest = useCallback(async () => {
    if (isSending) return;
    setIsSending(true);
    try {
      await AuthenticationService.register({
        email: props.email,
        password: props.pw,
      });
      setResMsg(`<p>Registration complete.</p>`);
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
        Register
      </Button>
      <div
        style={{ textAlign: "center" }}
        dangerouslySetInnerHTML={{ __html: resMsg }}
      ></div>
    </React.Fragment>
  );
};

export default RegisterRequest;
