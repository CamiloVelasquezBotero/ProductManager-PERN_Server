import { Request, Response, NextFunction } from 'express' /* Types */
import { check, validationResult } from 'express-validator'

export const handleInputErrors = (req:Request, res:Response, next:NextFunction) => {
    // -- Validacion
    // validamos con (check) con su metodo, y le anidamos el metodo del mensaje que enviara en caso de no ser validado y por ultimo usamos (run())
    // await check('name').notEmpty().withMessage('El nombre del producto no puede ir vacio').run(req) //Usamos los metodos anidados de (check) y ejecutamos con (run) pasandole el (req)
    // await check('price')
    //     .isNumeric().withMessage('Valor no valido') /* Validamos que sea numerico y le anidamos un metodo de mensaje */
    //     .notEmpty().withMessage('El precio no puede ir vacio') /* que no vaya vacio */
    //     .custom(value => value > 0 ).withMessage('Precio no valido') /* (custom) metodo personalizable, en caso de que sea menor a 0 */
    //     .run(req) /* Ejecutamos */

    let errors = validationResult(req) /* Obtenemos la validacion de (check) con (validationResult) e instanciamos los errores */
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()}) /* Enviamos los mensajes como array */
    }

    next() /* Funciona para seguir con la siguiente funcionen el router*/
}