import { getDB } from "../utils/db.js"
import { ObjectId } from "mongodb"

const COL = "spoonecularGroceries"
export const mongoDbFilterQueryController = async (req, res) => {

    // wie kommt der fetsch zum später MongoDB abfragen an
    // /filter?sortBy=lowest&priceFrom=80&priceTo=100&category=Frozen&badges=egg_free
    //  category=>in aisle=>Frozen (string)  und  badges=> in badges=>[egg_free, sugar_free]   und   collection spoonecularGroceries (Produkte)
    try {

        const { sortBy, priceFrom, priceTo, category, badges } = req.query
        console.log(req.query)
        const db = await getDB()

        const filter = {
            // price: { $gte: priceFrom, $lt: priceTo },
            aisle: category,
            badges: badges
        }
        console.log(filter)

        // dann als Funktion im .sort( sortieren() ) aufrufen
        const sortieren = () => {
         switch (sortBy)  {
                case "lowest":
                    return { price: 1 }
                case "highest":
                    return { price: -1 }
                case "likes":
                    return { likes: -1 }
                default:
                    return { price: 1 }
            }
            
        }

        // price: (sortBy === "lowest" ? 1 : -1),  //  1 = aufsteigend  -1 = absteigend
        // noch nach likes sortieren
        // likes: (sortLikes === "likes" ? 1 : -1)

        console.log(sortieren)

        console.log("update ausühren")
       // console.log('filet ', await db.collection(COL).find({ aisle: 'Frozen' }).toArray())

        const result = await db.collection(COL).find(filter, {
            projection: { _id: 1, id: 1, title: 1, price: 1, likes: 1, badges: 1, importantBadges: 1, aisle: 1, brand: 1, image: 1, images: 1, description: 1 }
        }).sort(sortieren()).toArray()
        
        res.status(200).json({
            result
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Fehler" })
    }


}