import {getDB} from "../utils/db.js"
import { ObjectId } from 'mongodb'

const COL = "spoonecularGroceries"

export const search = async (req, res) => {
    try {
        if (!req.query.search) return res.status(400).end()
        if (!req.query.offset) req.query.offset ="0"
        if (!req.query.limit) req.query.limit ="20"
        
        const db = await getDB()

        const regexQuery = {"title": new RegExp('^' +req.query.search + '$', 'i')}

        const cursor = await db.collection(COL).find({"title" : {$regex :" "+req.query.search + " "}},{projection:{"title":1,"price":1,"likes":1,"aisle":1,"description":1,"image":1,"badges":1,"importantBadges":1}});
        const result = await cursor.skip(Number(req.query.offset)).limit(Number(req.query.limit)).toArray();
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).end()

    }
    
}

export const getCategories = async function(_, res) {
    try{
        const db = await getDB()
        const result = await db.collection("categories").find().toArray()
        res.json(result).end()
    }catch (err) {
        console.log(err);
        res.status(500).end()
    }
}

export const getProductsFromCategories= async function(req, res) {
    try{
        if (!req.query.category) return res.status(400).end()
        if (!req.query.offset) req.query.offset ="0"
        if (!req.query.limit) req.query.limit ="20"
        console.log("test getfromCategories: ",req.query.category);
        const db = await getDB()
        const cursor = await db.collection(COL).find({"aisle":req.query.category})
        const result = await cursor.skip(Number(req.query.offset)).limit(Number(req.query.limit)).toArray()
        res.json(result).end()
    }catch (err) {
        console.log(err)
        res.status(500).end()
    }
}
export const getProductDetails = async function(req, res) {
    try{
        console.log(req.params.id);

        if (!req.params.id) return res.status(504).end()
        console.log(req.params.id);
        const db = await getDB()
        const result = await db.collection(COL).findOne({_id: new ObjectId(req.params.id)})
        res.json(result).end()

    }catch (err) {
        console.log(err)
        res.status(500).end()
    }
}