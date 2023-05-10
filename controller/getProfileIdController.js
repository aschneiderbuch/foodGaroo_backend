import { getDB } from '../utils/db.js'
import { ObjectId } from 'mongodb'

const COL = 'user'
export const getProfileId = async (req, res) => {

    try {
        console.log(req.body)

        const { id } = req.params
        const db = await getDB()
        const user = await db.collection(COL).findOne({ _id: new ObjectId(id) })
        console.log(user)

        if (user) {
            res.status(200).json({ user })
        }
        else {
            res.status(404).json({ message: `User mit ID: ${id} nicht gefunden` }, 481)
        }

    } catch (err) {
        res.status(500).json({ message: `Fehler bei getProfileId: ${err}` }, 482)
    }

}