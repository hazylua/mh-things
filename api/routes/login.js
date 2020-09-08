var express = require("express");
var router = express.Router();
var AuthenticationController = require("../controllers/AuthenticationController");

router.get("/", (req, res, next) => {
    res.send("login working properly");
});

router.post(
    "/",
    AuthenticationController.login
);

module.exports = router;
