import { getDB } from '../utils/db.js'
import { ObjectId } from 'mongodb'


// 597
const COL = 'orders'
export const getOrders = async (req, res ) => {
    try{
        const id = req.user.user

        const db = await getDB()
        const orders = await db.collection(COL).find( {userID: new ObjectId(id)} ).toArray()
        res.status(200).json(orders)
    }catch(err){
        console.log(err , 597)
        res.status(500).end()
    }
}