import { getDB } from "../utils/db.js"
import { ObjectId } from "mongodb"

const COL = "spoonecularGroceries"
export const mongoDbFilterQueryController = async (req, res) => {

    // wie kommt der fetsch zum später MongoDB abfragen an
    // /filter?sortBy=lowest&priceFrom=80&priceTo=100&category=Frozen&badges=egg_free
    //  category=>in aisle=>Frozen (string)  und  badges=> in badges=>[egg_free, sugar_free]   und   collection spoonecularGroceries (Produkte)
    try {

        const { sortBy, priceFrom, priceTo, category, badges, importantBadges } = req.query
        console.log(req.query)
        const db = await getDB()



 let badgesArray = []
        if (badges) {
            badgesArray= badges.split(',')
        }

let categoryArray = []
        if (category) {
            categoryArray= category.split(',')
        }

        let importantBadgesArray = []
        if (importantBadges) {
            importantBadgesArray = importantBadges.split(',')
        }

        const filter = {
            price: { 
                $gte: parseFloat(priceFrom) || 0, 
                $lt: parseFloat(priceTo) || 10000 },   // parseFloat umwandeln
                // 0 und 10000 damit es default Werte gibt und einfach alles angezeigt wird
            aisle: categoryArray.length > 0 ? { $in: categoryArray } : { $exists: true },
            badges: badgesArray.length > 0 ? { $all: badgesArray } : { $exists: true },  
            importantBadges: importantBadgesArray.length > 0 ? { $all: importantBadgesArray } : { $exists: true}

            // $exists: true  prüft nur ob es das Feld gibt und gibt alle zurück    als default, falls nichts ausgewählt wurde im FrontEnd
            // $in = durchsucht das Array nach dem Wert trennt beim ,       $in = findet alles    =>21
            // $all = findet nur wenn alle Werte im Array drin sind    => 4 Ergebnisse


        }
        console.log(filter)

        // dann als Funktion im .sort( sortieren() ) aufrufen
        const sortieren = () => {
            switch (sortBy) {
                case "lowest":
                    return { price: 1 }
                case "highest":
                    return { price: -1 }
                case "likes":
                    return { likes: -1 }
                case "spoonacularScore":
                    return { spoonacularScore: -1 }
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
            projection: { _id: 1, id: 1, title: 1, price: 1, likes: 1, spoonacularScore: 1 , badges: 1, importantBadges: 1, aisle: 1, brand: 1, image: 1, images: 1, description: 1 }
        }).sort(sortieren()).toArray()

        const resultCount = await db.collection(COL).find(filter, {
            projection: { _id: 1, id: 1, title: 1, price: 1, likes: 1, spoonacularScore: 1, badges: 1, importantBadges: 1, aisle: 1, brand: 1, image: 1, images: 1, description: 1 }
        }).sort(sortieren()).count()

        res.status(200).json({ resultCount, result })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Fehler" })
    }


}