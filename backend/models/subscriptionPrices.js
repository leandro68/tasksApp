const mongoose = require('mongoose')

const subscriptionPriceSchema = new mongoose.Schema({
    
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
      }, 
    price: {
        type: Number,
        required: true
    }, 
    month: {
        type: Number,
        required: true,
        enum: [1,2,3,4,5,6,7,8,9,10,11,12],
    },
    year: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return Number.isInteger(value) && value > 2024;
            },
            message: props => `${props.value} no es un año válido. Debe ser un número entero igual o mayor a 2025.`
        }

    },
    })

taskSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('subscriptionPrice', subscriptionPriceSchema)