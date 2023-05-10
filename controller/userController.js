import {getDB} from '../utils/db.js'


const COL= "user"

export const emailAvailable= async (req,res) => {
    try{
        //const db = await getDB()
        if(await emailExists(req.query.email)) return res.status(401).end()
        res.end()
    } catch(err){
        console.log(err.message)
        res.status(500)
    }
}
export const register= async (req,res) => {
    try{
        const db = await getDB()
        if(await emailExists(req.body.email)) return res.status(401).end()
        await db.collection(COL).insertOne(req.body)
        res.end()
    } catch(err){
        console.log(err.message)
        res.status(500)
    }
}

const emailExists = async (email) => {
    const db = await getDB()
    const result = await db.collection(COL).findOne({email: email})
    if(result === null) return false
    return true
}