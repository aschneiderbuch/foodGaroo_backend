import { log } from 'console'
import { getDB } from '../utils/db.js'
import { ObjectId } from 'mongodb'


// 594 
/* holt sich id über req.user.user
dann holt mal sich die COL_carts und die COL_deals
alle datum werden in new Date() umgewandelt so das sie als datum vergleichbar sind und als zahl gespeichert werden
vergleicht ob der rabatt zeitraum von deals noch gültig ist
akutelle datum ist new Date() und vergleicht es mit
deals.date und deals.dateEnd 
vergleicht die items und wenn sie im deals sind
dann gibt es auf diese items den rabatt der bei deals.percentage interlegt ist
beim item carts.items.quantity ist die menge hinterlegt
der gesamtpreis und der gesamtpreis mit rabatt wird berechnet
die ganzen sachen werden zum nachverfolgen in der COL_orders gespeichert
der carts des users wird komplett gelöscht  */
const COL_carts = 'carts'
const COL_deals = 'deals'
const COL_orders = 'orders'
export const getCartCheckout = async (req, res) => {
    try {
        const id = req.user.user
        const db = await getDB()
        const cart = await db.collection(COL_carts).findOne({ userID: new ObjectId(id) })  // find user carts
        const deals = await db.collection(COL_deals).find({}).toArray()
        // cart     object array mit items
        // deals     array array mit items
        // console.log(cart.items[].price) // geht
        // console.log(deals[0].items[].price) // geht



        // datum vergleich      .getTime()    umwandlung in zahl

        const dateNow = new Date().getTime() // geht
        const dealsDate = new Date(deals[0].date).getTime()
        const dealsDateEnd = new Date(deals[0].dateEnd).getTime()

        // vergleich ob deals noch gültig ist
        let sindDealsNochGueltig = false


        let cartItems = [{}]
        cartItems = cart.items
        console.log(cartItems)
        let dealsItems = deals[0].items

        let priceNeu = 0
        let rabatt = deals[0].percentage
        let priceNeuNoDeal = 0
        let priceTotal = 0
        const order = {
            _id: new ObjectId(),
            userID: new ObjectId(id),
            items: [],   //  cart.items,
            totalPrice: 0,
            deals: 0,
            percentage: 0,
            dealsDate: '',
            date: '',
            sum: 0,
            payment_status: 'paid', // ['paid', 'refunded'],
            status: 'pending' // ['pending', 'processing', 'cancelled', 'picked', 'shipped'],
        }
        order.items = []



        if (dateNow > dealsDate && dateNow < dealsDateEnd) {
            sindDealsNochGueltig = true

            for (let i = 0; i < cartItems.length; i++) {
                order.items.push(cartItems[i])

                for (let j = 0; j < dealsItems.length; j++) {

                    // console.log(' ----------- durchlauf dealsItems ----------- ')

                    if (cartItems[i]._id === dealsItems[j]._id) {

                        // console.log('################## ids sind gleich ##################')

                        // jetzt rabatt auf den preis anwenden und in priceNeu speichern
                        cartItems[i].priceOld = cartItems[i].price
                        priceNeu = cartItems[i].price - (cartItems[i].price * rabatt / 100)

                        cartItems[i].price = priceNeu

                        cartItems[i].priceNeu = priceNeu
                        // Rabatt wurde bei item angewendet
                        cartItems[i].rabatt = rabatt
                        order.deals = rabatt
                        order.percentage = rabatt
                        cartItems[i].rabattStatus = true
                        cartItems[i].deals = deals[0]._id
                        cartItems[i].dealsDate = dateNow
                        order.dealsDate = dateNow
                        cartItems[i].status = 'pending'
                        cartItems[i].payment_status = order?.payment_status
                        // datum als datum umwandeln und in dealsDateLesbar speichern
                        cartItems[i].dealsDateLesbar = new Date(dateNow)
                        order.date = new Date(dateNow)
                        // priceTotal berechnen
                        priceTotal = priceNeu * cartItems[i].quantity
                        cartItems[i].priceTotal = priceTotal

                        // löscht das gleiche item aus order.items
                        order.items = order.items.filter((item) => item._id !== cartItems[i]._id)
                        order.items.push(cartItems[i])

                    }
                    else {
                        // console.log('################## ids sind nicht gleich ##################')
                        // kein Rabatt
                    }
                }

            }

        } else {
            sindDealsNochGueltig = false
            // kein rabatt
            order.items.push(cartItems[i])
        }

        //  totalPrice    preis des gesamten carts berechnen

        let gesamtPreisAllerItems = 0

        for (let i = 0; i < order.items.length; i++) {
            gesamtPreisAllerItems += order.items[i].price * order.items[i].quantity
        }

        // ins order Objekt schreiben
        order.totalPrice = gesamtPreisAllerItems
        order.sum = gesamtPreisAllerItems

        // jetzt alte cart aus COL_carts löschen
        await db.collection(COL_carts).deleteOne({ userID: new ObjectId(id)})

        // jetzt order in COL_orders speichern
        await db.collection(COL_orders).insertOne(order)

        res.status(200).json(order).end()

    } catch (err) {
        console.log(err, 594)
        res.status(500).end()
    }
}