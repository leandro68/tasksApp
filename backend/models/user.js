const mongoose=require('mongoose') 

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true // esto asegura la unicidad de username
    }, 
    name: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    tasks: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Task'
        }
    ],

})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('user', userSchema)
