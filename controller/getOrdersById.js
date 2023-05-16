import { getDB } from '../utils/db.js'
import { ObjectId } from 'mongodb'


const COL= 'orders'
export const getOrdersById = async (req, res) => {
    try {
        const idUser = req.user.user
        const idParamsItem = req.params.id
        console.log(idUser)
        console.log(idParamsItem) // = _id der Order

        if (!idParamsItem) return res.status(504).end()

        const db = await getDB()

        const orders = await db.collection(COL).find({ _id: new ObjectId(idParamsItem) }).toArray()
        console.log(orders);
        res.status(200).json(orders).end()

    } catch (err) {
        console.log(err, 598);
        res.status(500).end()
    }
}