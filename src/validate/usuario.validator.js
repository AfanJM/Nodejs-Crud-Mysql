import { body } from "express-validator";

export const userValidation = [

    body('nombre')
    .isString().withMessage('Este campo debe ser un string')
    .notEmpty().withMessage('Por favor llene este campo')
    .isLength({min:4}).withMessage('Este campo deber contener al menos 4 caracteres'),

    body('email')
    .isEmail().withMessage('El formato del correo electrónico no es válido')
    .notEmpty().withMessage('Por favor llene este campo'),

    
    body('telefono')
    .isLength({ min: 8 }).withMessage('El teléfono debe tener al menos 8 digitos')
    .notEmpty().withMessage('Por favor llene este campo')


]