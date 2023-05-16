import { getDB } from '../utils/db.js'
import { ObjectId } from 'mongodb'

// 587  Fehler bei postUserInputDatenUpdaten
const COL = 'user'
export const postUserInputDatenUpdaten = async (req, res) => {

    try {
        console.log(req.body)
        // da user id aus der Middleware kommt wird     const {id} = req.params nicht mehr benötigt
        const id = req.user.user
        const db = await getDB()
        // console.log(id)



        const user = await db.collection(COL).updateOne({ _id: new ObjectId(id) },
            {
                $set: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    // email: req.body.email,     //  email darf aktuell nicht geändert werden
                    address: {
                        street: req.body.address.street,
                        number: req.body.address.number,
                        zipCode: req.body.address.zipCode,
                        city: req.body.address.city
                    },
                    phone: req.body.phone
                }
            })
        console.log(user)

        res.status(201).json(user).end()
    } catch (err) {
        console.log(err, 587)
        res.status(500).json({ message: `Fehler bei postUserInputDatenUpdaten` }, 587)
    }
}