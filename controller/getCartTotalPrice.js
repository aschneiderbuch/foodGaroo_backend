import { getDB } from "../utils/db.js"
import { ObjectId } from "mongodb"


// 592 500 Fehler bei getCartTotalPrice
const COL = 'carts'
/* // cart soll nach der objectId des users gefiltert werden, 
dann sollen alle items in cart aufgelistet werden, 
dann soll der price von jedem item in cart mit dem quantity jedes items aufsummiert werden
 */
export const getCartTotalPrice = async (req, res) => {
    try {
        const id = req.user.user
        const db = await getDB()
        let cart = await db.collection(COL).findOne({ userID: new ObjectId(id) })

        // damit es bei checkout Button nicht zu Fehler kommt
        let items = []
        if (cart === null || cart === undefined) {
            cart = await db.collection(COL).insertOne({ userID: new ObjectId(id), items: [] })
            items = cart.items
        }

        // damit es bei checkout Button nicht zu Fehler kommt
        if (cart !== null && cart !== undefined && Array.isArray(cart)) {
            items = cart.items
        }



        items = cart.items
        // console.log(cart?.items[0].price)
        //  console.log(cart?.items[0].quantity)

        let totalPrice = 0
        // if löst den Fehler bei checkout Button
        if (items !== null || items !== undefined && Array.isArray(items)) {
            for (let i = 0; i < items.length; i++) {
                totalPrice += items[i].price * items[i].quantity
            }
        }

        totalPrice = totalPrice.toFixed(2)

        res.status(200).json({ totalPrice: totalPrice }).end()
    } catch (err) {
        console.log(err, 592)
        res.status(500).json({ message: `Fehler bei getCartTotalPrice` }, 592)
    }
}