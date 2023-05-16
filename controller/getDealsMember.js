import { getDB } from '../utils/db.js'
import { ObjectId } from 'mongodb'


// 596
const COL = 'dealsMember'
export const getDealsMember = async (req, res) => {
    try {
        const id = req.user.user
        const db = await getDB()

        const deals = await db.collection(COL).find({}).toArray()

        console.log(deals.items);
        res.status(200).json(deals)

    } catch (err) {
        console.log(err, 595);
        res.status(500).end()
    }
}


