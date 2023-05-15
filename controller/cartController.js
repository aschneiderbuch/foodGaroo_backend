import {getDB} from "../utils/db.js"
import { ObjectId } from 'mongodb'


export const getCart = async function(req, res){
    try{
        const db = await getDB()
        const cart = await db.collection("carts").findOne({userID: new ObjectId(req.user.user)})
        res.json(cart).end
    }catch(err){
        console.log(err)
        res.status(501).end()
    }
}
export const addItemToCart = async function(req, res){
    const filter = { userID: new ObjectId(req.user.user) };
    const updateDOC = {
        $setOnInsert: {
            userID: new ObjectId(req.user.user),
            
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
export const deleteItemFromCart = async function(req, res){
    const filter = { userID: new ObjectId(req.user.user) };
    const updateDOC = {
        $pull: {
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
export const modifyItemQuantity = async function(req, res){
    const filter = { userID: new ObjectId(req.user.user) };
    const updateDOC = {
        $set: {
            [`items.${req.body.index}`]: req.body.item
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
