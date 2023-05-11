

import cloudinary from 'cloudinary'
import '../config/config.js'   // as damit .env geht
import Joi from 'joi'
import { getDB } from '../utils/db.js'
import { ObjectId } from 'mongodb'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


export const cloudinaryUpload = async (req, res) => {

    try {
        cloudinary.v2.uploader.upload_stream({ resource_type: 'image', folder: '2023imageOrdner_foodGuru' }, async (err, result) => {

            // console.log(result) // ergebnis von cloudinary
            console.log(req.body)
            console.log(req.user)  // ! hier user id? wenn nicht
            // ! dann noch      verifyJWTTokenMiddleware  mit rein // as für die Route

            const schema = Joi.object({
                name: Joi.string().min(3).max(30).required(),
                imgUrl: Joi.string().uri().required()
            })

            const { error, value } = schema.validate({
                name: req.body.name,
                imgUrl: result.secure_url
            }, { abortEarly: false }
            )

            if (error) {
                throw new Error(`Fehler beim Hochladen cloudinaryUpload: ${error} `, 585)
            }

            const db = await getDB()
            // db.collection('user').insertOne({ name: req.body.name, imgUrl: result.secure_url })
            // zuerst nach der user id anhand von name: suchen,  und dann updateOne mit $set und dann die imgUrl: result.secure_url rein

            const test = new ObjectId( req.user.user )
            
            console.log("update ausühren")
            console.log('filet ', { _id: test._id })
            console.log('updat', { $set: { userImg: result.secure_url } })
            const filter = { _id: test}
            const ersetzen = { userImg: result.secure_url }

           // db.collection('user').insertOne({ filter, imgUrl: result.secure_url })
          //const updateResult =  await db.collection('user').findOneAndUpdate({filter, projection: { userImg: result.secure_url }} )
       const updateResult =  await db.collection('user').updateOne(filter, { $set: { userImg: result.secure_url } })
             //    const replaceResult =  await db.collection('user').replaceOne(filter,  ersetzen )

            console.log('updateResult', updateResult.modifiedCount)

            res.status(201).json({ message: 'Bild erfolgreich hochgeladen', url: result.secure_url })
        }).end(req.file.buffer)

    } catch (err) {
        console.log(err, 585 )
        res.status(500).json({ message: `Fehler beim Hochladen: ` })
    }
}