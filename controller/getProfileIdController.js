import { contextsKey } from 'express-validator/src/base.js'
import { getDB } from '../utils/db.js'
import { ObjectId } from 'mongodb'

const COL = 'user'
export const getProfileId = async (req, res) => {

    try {
        console.log(req.body)
        console.log(req.user)  // ! das wird bei der Middleware verifyJWTTokenMiddleware eingefügt, so das wir immer wisser wer der user ist
        
       // const {id} = req.params
        const  id  = req.user.user
        const db = await getDB()
        const user = await db.collection(COL).findOne({ _id: new ObjectId(id) },{ projection: { password: 0 }}) // ! hier wird das password nicht mit ausgegeben das es sonst im FrontEnd sichtbar ist
        console.log(user)

        if (user) {
            res.status(200).json({ user })
        }
        else {
            res.status(404).json({ message: `User mit ID: ${id} nicht gefunden` }, 481)
        }

    } catch (err ) {
        console.log(err , 482 )
        res.status(500).json({ message: `Fehler bei getProfileId` }, 482)
    }

}