import {getDB} from "../utils/db.js"
import { ObjectId } from 'mongodb'


export const getCart = async function(req, res){
    try{
        const db = await getDB()
        const cart = db.collection("carts").findOne({_id: new ObjectId(req.params.id)})
        res.json(cart).end
    }catch(err){
        console.log(err)
        res.status(501).end()
    }
}
export const addItemToCart = async function(req, res){
    const filter = { _id: new ObjectId(req.params.id) };
    const updateDOC = {
        $setOnInsert: {
            userID: new ObjectID(req.user.user),
            items: []
        },
        $push: {
            items: req.body.item
        }
    }
    const options = { upsert: true };
    try{
        const db = await getDB()
        await db.collection("carts").updateOne(filter,updateDOC,options)
        res.status(200).end()
    }catch(err){
        console.log(err)
        res.status(500).end()
    }
}