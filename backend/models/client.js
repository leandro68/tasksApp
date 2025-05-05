const mongoose=require('mongoose') 

const clientSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    }, 
    subscriber: {
        type: Boolean,
        required: true
    },
    tasks: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Task'
            }
    ],
})

clientSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('client', clientSchema)