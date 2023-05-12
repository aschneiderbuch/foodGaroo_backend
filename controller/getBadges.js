import { getDB } from "../utils/db.js"

const COL = 'badges'
export const getBadges = async (req, res) => {
    try {
        const db = await getDB()
        
        const result = await db.collection(COL).find().toArray()
        res.json(result).end()

    } catch (err) {
        console.log(err, 586)
        res.status(500).end()
    }
}