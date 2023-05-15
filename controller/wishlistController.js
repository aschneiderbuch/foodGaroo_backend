import { getDB } from "../utils/db.js"
import { ObjectId } from "mongodb"

// 588  Fehler bei postWishlist
const COL = "wishlist"
// wishlist item vom FrontEnd wird durcheschoben, user id kommt aus der Middleware verifyJWTTokenMiddleware, dann wird in die MongoDB das gesamte item geschrieben
export const postWishlist = async (req, res) => {
    try {
        const id = req.user.user

        const filterNachId = { _id: new ObjectId(id) }  // sucht und prüft ob User schon eine Wishliste hat

        const updateDOCmitBody = {
            $setOnInsert: {
                userID: new ObjectId(id),
            },
            $push: { items: req.body }  //  item in das Array items hinzufügen
        }
        const options = { upsert: true };  // true  erstellt eine neue Wishlist wenn noch keine vorhanden ist

        const db = await getDB()
        const wishlist = await db.collection(COL).updateOne(
            filterNachId, updateDOCmitBody, options)

        console.log(wishlist)
        res.status(200).json(wishlist).end()
    } catch (err) {
        console.log(err, 588)
        res.status(500).json({ message: `Fehler bei postWishlist` }, 588)
    }
}



// 589  
// nur das eine item aus dem Whislist Array löschen
export const deleteWishlistItem = async (req, res) => {
    try {
        const id = req.user.user

        const filterNachId = { _id: new ObjectId(id) }

        const updateDOCmitBody = {
            $pull: { items: req.body }
        }
        const options = { upsert: true }

        const db = await getDB()
        const wishlist = await db.collection(COL).updateOne(
            filterNachId, updateDOCmitBody, options)

        console.log(wishlist)
        res.status(200).json(wishlist).end()
    } catch (err) {
        console.log(err, 589)
        res.status(500).json({ message: `Fehler bei deleteWishlistItem` }, 589)
    }
}

export const getWishlist = async (req, res) => {
    try {
        const id = req.user.user

        // nicht _id sondern userID weil wir nach der userID suchen
        const filterNachId = { _id: new ObjectId(id) }

        const db = await getDB()
        const wishlist = await db.collection(COL).findOne(filterNachId)

        res.status(200).json(wishlist).end()
    }   catch (err) {
        console.log(err, 590)
        res.status(500).json({ message: `Fehler bei getWishlist` }, 590)
    }
}