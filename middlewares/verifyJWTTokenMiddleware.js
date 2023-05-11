import { verifyToken } from "../utils/token.js"


export const verifyJWTTokenMiddleware = (req, res, next) => {
    const token = req.cookies.token

    try {
        const userClaim = verifyToken(token)
       
        req.user = userClaim
        console.log(req.user)
        
        next()
    } catch (err) {
        console.log(err)
        res.status(401).end()
    }
}