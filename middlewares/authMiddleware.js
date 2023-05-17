import {createHmac} from 'crypto'
import {validationResult} from 'express-validator'

export const encryptPassword = (req, res, next) => {
    const result = validationResult(req);
    console.log(result.errors);
    if (result.errors.length>0) {
        console.log("test");
       return res.status(400).end();
    }
    console.log("test encrypt password");
    const hmac = createHmac('sha256', req.body.password)
    req.body.password = hmac.digest('hex')
    next()
}