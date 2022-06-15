const {body} = require('express-validator')

module.exports = [
    body('email').notEmpty().withMessage("Debes ingresar el email").bail().isEmail().withMessage("Debes ingresar un formato de email válido"),
    body('password').notEmpty().withMessage("Debes ingresar la contraseña")
]