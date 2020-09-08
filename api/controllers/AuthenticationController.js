const { User } = require("../models");

const config = require("../config/config")

const webtoken = require("jsonwebtoken")

// Generate webtoken
function webtokenSignUser(user) {
  return webtoken.sign(user, config.authentication.webtokenSecret, {
    expiresIn: "30m"
  })
}

module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: webtokenSignUser(userJson)
      });
    } catch (err) {
      res.status(400).send({
        error: "This email account is already in use.",
      });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })

      if (!user) {
        res.status(403).send({
          error: "The login information was incorrect."
        })
      }

      const isPasswordCorrect = await user.comparePassword(password)
      if (!isPasswordCorrect) {
        res.status(403).send({
          error: "The login information was incorrect."
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: webtokenSignUser(userJson)
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: "An error has occurred during login."
      })
    }
  },
};
