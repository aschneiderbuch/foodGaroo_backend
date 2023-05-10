
import { getDB } from '../utils/db.js'
import { createToken } from '../utils/token.js'

// def für https cookies
const cookieConfig = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
}

// login 
const COL = 'user'
export const login = async (req, res) => {

    try {
        console.log(req.body)
        const { email, password } = req.body;
        const db = await getDB();
        const dbUser = await db.collection(COL).findOne({ email: email, password: password })
        console.log(dbUser)

        if (dbUser === null) {
            res.status(404).json({ message: `User Login nicht möglich`}, 581)
        }
        else { 
            console.log(dbUser)
            // token erstellen
            const token = createToken(dbUser)
            res.cookie('token', token, cookieConfig)
            res.status(200)
        }
        
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: `User Login nicht möglich ${err}`}, 581)
    }
}