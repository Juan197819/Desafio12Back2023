import { errorCustom } from "./errorHandler.js"

export function isUser(req, res, next) {
    if (req.user.rol == 'Usuario') {
        next()
    } else {
        throw new errorCustom('Unauthorized', 401, 'Access denied!! (Route only for user)')
    }
}