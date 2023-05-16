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
export const getCartCount = async function(req, res){
    try{
        const db = await getDB()
        const cart = await db.collection("carts").findOne({userID: new ObjectId(req.user.user)})
        res.json({count: cart.items.length}).end
    }catch(err){
        console.log(err)
        res.status(501).end()
    }
}

const COL = 'carts'
export const addItemToCart = async function(req, res){

    const id = req.user.user
    /* prüfen ob das item das vom FrontEnd kommt schon in der MongoDB vorhanden ist 
     wenn ja, dann die quantity von der mongoDB aus dem item holen 
     dann die quantity vom FrontEnd und mongoDB zusammen zählen
     dann die neue quantity in die MongoDB schreiben */
    const db = await getDB()
    const cart = await db.collection(COL).findOne({ userID: new ObjectId(id) })  // find user carts
    const items = cart?.items || 0 // array mit items
    let itemSchonVorhanden = false
    let itemIndex = 0
    for (let i = 0; i < items.length; i++) {     // Schleife über alle items
        if (items[i].id === req.body.item.id) {   // vergleicht frontEnd mit mongoDB
            itemSchonVorhanden = true
            itemIndex = i                // speichert den index des items  zum späteren updaten
        }
    }
    if (itemSchonVorhanden) {
        const filter = { userID: new ObjectId(id) };
        const updateDOC = {
            $set: {
                // nur quantity updaten     :    rechnen - bestehende quantity + neue quantity aus FrontEnd
                [`items.${itemIndex}.quantity`]: items[itemIndex].quantity + req.body.item.quantity
            }
        }
        const options = { upsert: true };
        try{
            const db = await getDB()
            await db.collection(COL).updateOne(filter,updateDOC,options)
            res.status(200).end()
        }catch(err){
            console.log(err , 593)
            res.status(500).end()
        }
    } else {



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
}}



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
