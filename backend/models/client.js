const mongoose=require('mongoose') 

const clientSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    }, 
    subscriber: {
        type: Boolean,
        required: true
    }
})

clientSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Client = mongoose.model('Client', clientSchema)

module.exports = Client