import Joi from 'joi';


export const multerCloudinaryOptionsController = {
    limits: {
        fileSize: 1 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {

        const schema = Joi.object({
            bildGroesse: Joi.number().max(1 * 1024 * 1024).required(),
            mimetype: Joi.string().valid('image/png', 'image/jpeg', 'image/jpg').required()
        })

        const { error, value } = schema.validate({
            bildGroesse: req.headers['content-length'],
            mimetype: file.mimetype
        }, {abortEarly: false})

        if (error) {
            const errorMessages = error.details.map(detail => detail.message)
            cb(new Error(`Fehler beim Hochladen: ${errorMessages.join(', ')}`, 481))
        }
        else {
            cb(null, true)
        }
    },
    storage: multer.memoryStorage()
}