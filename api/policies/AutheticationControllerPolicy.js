var Joi = require('joi')

module.exports = {
    register(req, res, next) {
        const schema = {
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            )
        }

        const { error, value } = Joi.validate(req.body, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: "Invalid email format."
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: `Invalid password. It needs to match the following:
                        <br>
                        1. It may only contain uppercase letters, lowercase letters and numbers;
                        <br>
                        2. It must be at least 8 to 32 characters long.
                        `
                    })
                    break
                default:
                    res.status(400).send({
                        error: "Invalid registration information."
                    })

            }
        } else {
            next()
        }
    }
}