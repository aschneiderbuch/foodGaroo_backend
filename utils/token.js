import jwt from 'jsonwebtoken'

export const createToken = (user) => {
const token = jwt.sign( { user: user._id}, 
    process.env.JWT_SECRET,
    { expiresIn: '20d'})

    return token
}

export const verifyToken = (token) => {

    try {
        const decodeResult = jwt.verify(token,
            process.env.JWT_SECRET)
        
            return decodeResult
    } catch (err) {
        console.log(err)
        throw new Error(`Token konnte nicht verifiziert werden ${err}`, 582)
    }
}