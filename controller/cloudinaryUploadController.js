

import cloudinary from 'cloudinary'
import '../config/config.js'   // as damit .env geht
import Joi from 'joi'
import { getDB } from '../utils/db.js'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


export const cloudinaryUpload = async (req, res) => {

    try {
        cloudinary.v2.uploader.upload_stream({
            resource_type: 'image', folder: '2023imageOrdner_foodGuru'
        },
            async (err, result) => {

                const schema = Joi.object({
                    name: Joi.string().min(3).max(30).required(),
                    imgUrl: Joi.string().uri().required()
                })

                const { error, value } = schema.validate({
                    name: req.body.name,
                    imgUrl: result.secure_url
                }, { abortEarly: false })

                if (error) {
                    throw new Error(`Fehler beim Hochladen cloudinaryUpload: ${error} `, 585)
                }

                const db = await getDB()
                db.collection('profilBilderURL').insertOne({ name: req.body.name, imgUrl: result.secure_url })
                res.status(201).json({ message: 'Bild erfolgreich hochgeladen', url: result.secure_url })
            }).end(req.file.buffer)

    } catch (err){
        res.status(500).json({ message: `Fehler beim Hochladen: ${err.message}`})
    }
}