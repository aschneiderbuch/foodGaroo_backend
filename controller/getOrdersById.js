import { getDB } from '../utils/db.js'
import { ObjectId } from 'mongodb'


const COL= 'orders'
export const getOrdersById = async (req, res) => {
    try {
        const id = req.params.id

        if (!id) return res.status(504).end()
        console.log(id);

        const db = await getDB()

        const orders = await db.collection(COL).find({ _id: new ObjectId(id) }).toArray()

        res.status(200).json(orders)

    } catch (err) {
        console.log(err, 598);
        res.status(500).end()
    }
}