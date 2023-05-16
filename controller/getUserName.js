import { getDB } from '../utils/db.js'
import { ObjectId } from 'mongodb'

// 591
const COL = 'user'
export const getUserName = async (req, res) => {
    try {

        const id = req.user.user

        const db = await getDB()
        const user = await db.collection(COL).findOne({ _id: new ObjectId(id) })
        console.log(user)
        res.status(200).json(user).end()
    } catch (err) {
        console.log(err, 591)
        res.status(500).json({ message: `Fehler bei getUserName` },591)
    }
}

