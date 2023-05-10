import {createHmac} from 'crypto'

export const encryptPassword = (req, _, next) => {
    console.log("test encrypt password");
    const hmac = createHmac('sha256', req.body.password)
    req.body.password = hmac.digest('hex')
    next()
}