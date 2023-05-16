import { getDB } from '../utils/db.js'
import { ObjectId } from 'mongodb'


// 597
const COL = 'orders'
export const getOrders = async (req, res ) => {
    try{
        const id = req.user.user

        const db = await getDB()
        const orders = await db.collection(COL).find( {userID: new ObjectId(id)} ).toArray()
        const ordersCount = await db.collection(COL).find( {userID: new ObjectId(id)} ).count()

        console.log(ordersCount)
        res.status(200).json({ ordersCount: ordersCount, orders: orders})
    }catch(err){
        console.log(err , 597)
        res.status(500).end()
    }
}