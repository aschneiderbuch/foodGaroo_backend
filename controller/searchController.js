import {getDB} from "../utils/db.js"

const COL = "spoonecularGroceries"

export const search = async (req, res) => {
    try {
        if (!req.query.search) return res.status(400).end()
        if (!req.query.offset) req.query.offset ="20"
        if (!req.query.limit) req.query.limit ="20"
        
        const db = await getDB()
        const cursor = await db.collection(COL).find({"title" : {$regex : req.query.search}},{"title":1});
        const result = await cursor.skip(Number(req.query.offset)).limit(Number(req.query.limit)).toArray();
        res.json(result)
    } catch (err) {
        console.log(err)
    }
    
}