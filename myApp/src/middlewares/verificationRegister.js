const {body} = require('express-validator');

const validateRegister = [
    body('first_name').notEmpty().withMessage('Debes ingresar tu nombre'),
    body('last_name').notEmpty().withMessage('Debes ingresar tu apellido'),
    body('email').isEmail().withMessage('Debes ingresar un email válido'),
    body('password').notEmpty().withMessage('Debes ingresar una contraseña').bail().isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('password_verification').notEmpty().withMessage('Debes ingresar tu contraseña nuevamente').bail().isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
]

module.exports = validateRegister;