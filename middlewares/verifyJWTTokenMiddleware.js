import { verifyToken } from "../utils/token"


export const verifyJWTTokenMiddleware = (req, res, next) => {
    const token = req.cookies.token

    try {
        const userClaim = verifyToken(token)
        req.user = userClaim
        console.log(req.user)
        next()
    } catch (err) {
        console.log(err)
        res.status(401).json( { message: `Token konnte nicht verifiziert werden ${err}`}, 583)
    }
}