/**
 * Esta funcion crea un objeto de error personalizado que se lanza para ser capturado en la funcion "errorHandler".
 * @param {String} error - Nombre o tipo de Error
 * @param {Number} status - Codigo de estado 
 * @param {String} message - Mensaje de error personalizado
 * @param {object} [detailsError] - Detalles especiales
 * @returns 
 */
export function errorCustom(error, status, message, detailsError) {
    return { errCustom: { error, status, message, detailsError}}
}
/**
 * El errorHandler captura todos los posibles errores de la App y verifica si es un error ya personalizado (deberia venir la variable "errCustom" en true) lo devuelve como respuesta al cliente y como "stack" solo existe en errores inesperados del servidor logueamos el error personalizado completo. En el caso de un error inesperado antes de enviarlo como respuesta lo personalizamos con los datos orignales y logueamos el "stack" que si viene desde el servidor.
 * @param {object} error - Error Personalizado mediante la funcion errorCustom() o inesperado generado automaticamente.
 * @param {empty} req - Viene desde peticion (No es utilizado en esta funcion )
 * @param {object} res -  Viene desde peticion para responder con error generado.
 * @param {function} next -  Viene desde peticion (No es utilizado en esta funcion )
 */
export function errorHandler(error, req, res, next) {
    //Al meter el error personalizado dentro de la prop. "errorCustom" puedo (con el if (!errCustom) diferenciar a los ya personalizados de los que no (inesperados) y asi darle formato a estos ultimos usando los datos del error original.
    let { errCustom, stack } = error
    if (!errCustom) {
        let errorCompleto = (errorCustom(error.name, error.status || error.statusCode || 500, error.message))
        errCustom= errorCompleto.errCustom
    }
    console.log('Error Original', stack|| errCustom) 
    res.status(errCustom.status).json(errCustom)
}