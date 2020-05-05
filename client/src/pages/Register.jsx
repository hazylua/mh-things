import React, { useState } from "react";
import AuthenticationService from "../services/AuthenticationService";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

async function registerUser(email, pw, errorMsg) {
  try {
    await AuthenticationService.register({
      email: email,
      password: pw,
    });
  } catch (error) {
    errorMsg = error.response.data.error;
  }
}

const Register = () => {
  var [userEmail, setUserEmail] = useState("");
  var [userPassword, setUserPassword] = useState("");
  var [errorMsg, setErrorMsg] = useState([]);
  const classes = useStyles();

  return (
    <div>
      <form className={classes.root} noValidate autoCapitalize="off">
        <TextField
          value={userEmail}
          label="Email"
          onChange={(e) => setUserEmail((userEmail = e.target.value))}
        />
        <TextField
          label="Password"
          onChange={(e) => setUserPassword((userPassword = e.target.value))}
        />
        <Button
          variant="outlined"
          onClick={() =>
            setErrorMsg(registerUser(userEmail, userPassword, errorMsg))
          }
        >
          Register
        </Button>
        <div
          style={{ textAlign: "center", color: "red" }}
          dangerouslySetInnerHTML={{ __html: errorMsg }}
        ></div>
      </form>
      <h1 className="page-title">Register</h1>
    </div>
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