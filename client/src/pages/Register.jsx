import React, { useState, useCallback } from "react";
import AuthenticationService from "../services/AuthenticationService";
import { TextField, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const SendRequest = (props) => {
  const [isSending, setIsSending] = useState(false)
  const [errorMsg, setErrorMsg] = useState(``)
  const sendRequest = useCallback(async () => {
    if(isSending)
      return
    setIsSending(true)
    try {
      await AuthenticationService.register({
        email: props.email,
        password: props.pw,
      });
      setErrorMsg(`<p>Registration complete.</p>`)
    } catch (error) {
      setErrorMsg(error.response.data.error) 
    }
    setIsSending(false)
  }, [isSending])
  return (
    <React.Fragment>
      <Button
          variant="outlined"
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
  )
}

const Register = () => {
  var [userEmail, setUserEmail] = useState("");
  var [userPassword, setUserPassword] = useState("");
  const classes = useStyles();

  return (
    <Grid container direction="row">
      <form className={classes.root} noValidate autoCapitalize="off">
        <TextField
          value={userEmail}
          label="Email"
          onChange={(e) => setUserEmail((userEmail = e.target.value))}
        />
        <TextField
          value={userPassword}
          label="Password"
          onChange={(e) => setUserPassword((userPassword = e.target.value))}
        />
        <SendRequest email={userEmail} pw={userPassword}></SendRequest>
      </form>
    </Grid>
  );
};

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