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
      console.log(props.email, props.pw);
      setErrorMsg(error.response.data.error);
    }
    setIsSending(false);
  }, [isSending]);

  return (
    <React.Fragment>
      <Button
        variant="outlined"
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
    <Container className="d-flex justify-content-center">
      <Col>
        <h2 className="text-center mb-50">Register</h2>
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

{
  /* <TextField
          value={userEmail}
          label="Email"
          type="email"
          onChange={(e) => setUserEmail((userEmail = e.target.value))}
        />
        <TextField
          value={userPassword}
          label="Password"
          type="password"
          onChange={(e) => setUserPassword((userPassword = e.target.value))}
        />
        <SendRequest
          email={userEmail}
          pw={userPassword}
          key={userEmail}
        ></SendRequest> */
}

export default Register;

// export default class Register extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       userEmail: "",
//       userPassword: "",
//       errorMessage: ``,
//     };
//   }

//   async registerUser() {
//     try {
//       await AuthenticationService.register({
//         email: this.state.userEmail,
//         password: this.state.userPassword,
//       });
//     } catch (error) {
//       this.setState({
//         errorMessage: error.response.data.error,
//       });
//     }
//   }

//   getUserName = (e) => {
//     this.setState({
//       userEmail: e.target.value,
//     });
//   };

//   getUserPassword = (e) => {
//     this.setState({
//       userPassword: e.target.value,
//     });
//   };

//   render() {
//     return (
//       <div>
//         <form noValidate autoCapitalize="off">
//           <TextField variant="filled" />
//         </form>
//         <h1 className="page-title">Register</h1>

//         <input
//           value={this.state.userName}
//           className="register-input"
//           type="email"
//           onChange={this.getUserName}
//         ></input>

//         <input
//           value={this.state.userPassword}
//           className="register-input"
//           type="password"
//           onChange={this.getUserPassword}
//         ></input>

//         <button
//           className="register-button"
//           onClick={this.registerUser.bind(this)}
//         >
//           Register
//         </button>
//         <div
//           style={{ textAlign: "center", color: "red" }}
//           dangerouslySetInnerHTML={{ __html: this.state.errorMessage }}
//         ></div>
//       </div>
//     );
//   }
// }
