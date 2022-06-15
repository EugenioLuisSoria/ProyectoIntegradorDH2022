const {body} = require('express-validator')
const { CustomValidation } = require('express-validator/src/context-items')
const path = require('path');

customValidation = new CustomValidation(
    {
        isImage: (value) => {   
            return path.extname(value).match(/\.(jpg|jpeg|png|gif)$/);
        }
    }
);


module.exports = [
    body('create_form_product_name').notEmpty().withMessage("Debes ingresar el nombre").bail().isLength({min: 5}).withMessage("El nombre debe tener al menos 5 caracteres"),
    body('create_form_product_description').notEmpty().withMessage("Debes ingresar la descripción del producto").bail().isLength({min: 20}).withMessage("La descripción debe tener al menos 20 caracteres"),
    body('create_form_product_image').notEmpty().withMessage("Debes ingresar la imagen del producto").bail().custom(value => {
        return customValidation.isImage(value, req.files['create_form_product_image'][0].filename);
    }
    ).withMessage("La imagen debe ser una imagen válida"),
]
