var express = require("express");
var router = express.Router();
var AuthenticationController = require("../controllers/AuthenticationController");

var AuthenticationControllerPolicy = require("../policies/AutheticationControllerPolicy");

router.get("/", (req, res, next) => {
  res.send("register is working properly");
});

router.post(
  "/",
  AuthenticationControllerPolicy.register,
  AuthenticationController.register
);

// (?)
// router.post('/', ('register', AuthenticationController.register))

module.exports = router;

// Alternative (?):
// Here:
// module.exports = (app) => {
//     app.post('register', AuthenticationController.register)
// }
//
// then in app.js:
// require('./routes/register')(app)
