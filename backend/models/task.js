const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    /* user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },*/
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
      }, 
    category: {
        type: String,
        required: true,
        enum: ["REMOTO", "PRESENCIAL"]

    }, 
    goTrip: {
        type: Date,
        default: null,
        validate: {
            validator: function(value) {
                // Si endWork es null, backTrip debe ser null
                if ( this.category === "PRESENCIAL") {
                    return false;
                }
                return true;
            },
            message: "goTrip solo puede tener una fecha category es PRESENCIAL"
        }
    },
    startWork: {
        type: Date,
        default: null,
        validate: {
            validator: function(value) {
                // Si gotrip tiene una fecha, debe ser menor a startwork
                if (this.goTrip !== null && value !== null ) {
                    return this.goTrip < value;
                }
                //si category es PRESENCIAL gotrip no puede ser null
                if (this.category === "PRESENCIAL" && value !== null ) {
                    return this.goTrip < value;
                }
                return true;
            },
            message: "startWork solo puede tener una fecha si goTrip es null o anterior a endWork"
        }

    },
    endWork: {
        type: Date,
        default: null,
        validate: {
            validator: function(value) {
                // Si endWork es null, backTrip debe ser null
                if (this.startWork === null && value !== null) {
                    return false;
                }
                // Si endWork tiene una fecha, debe ser menor a backTrip
                if (this.startWork !== null && value !== null) {
                    return this.startWork < value;
                }
                return true;
            },
            message: "endWork solo puede tener una fecha si startWork tiene una fecha anterior a endWork"
        }
    },
    backTrip: {
        type: Date,
        default: null,
        validate: {
            validator: function(value) {
                // Si endWork es null, backTrip debe ser null
                if (this.endWork === null && value !== null && this.category === "PRESENCIAL") {
                    return false;
                }
                // Si endWork tiene una fecha, debe ser menor a backTrip
                if (this.endWork !== null && value !== null) {
                    return this.endWork < value;
                }
                return true;
            },
            message: "backTrip solo puede tener una fecha si endWork tiene una fecha anterior a endWork  y si category es PRESENCIAL"
        }

    },
    order: {
        type: String,
        required: true
    }, 
    report: {
        type: String,
        default: null
    },
    transport: {
      type: String,
      enum: ["AUTO", "T.PUBLICO", null],
      default: null,
      validate: {
        validator: function(value) {
            // Solo valida si startWork no es null
            return value === null || this.category === "PRESENCIAL";
        },
        message: "transport solo puede ser diferente a null si category es PRESENCIAL"
    }
    },
    tripCost: {
        type: Number,
        default: null,
        validate: {
            validator: function(value) {
                // Solo valida si startWork no es null
                return value === null || this.goTrip in ["AUTO", "T.PUBLICO"];
            },
            message: "tripCost solo puede tener un valor si tripCost no es null"
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

module.exports = mongoose.model('task', taskSchema)