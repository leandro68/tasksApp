const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    inputDate: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
      }, 
    category: {
        type: String,
        enum: ["REMOTE", "ON PREMISE", "LOGISTIC", null],
        default: null
    }, 
    goTrip: {
        type: Date,
        default: null,
        /* validate: {
            validator: function(value) {
                // Si endWork es null, backTrip debe ser null
                if ( value !== null && this.category === "REMOTE") {
                    return false;
                }
                return true;
            },
            message: "goTrip solo puede tener una fecha si category es ON PREMISE O LOGISTIC"
        } */
    },
    startWork: {
        type: Date,
        default: null,
        /* validate: {
            validator: function(value) {
                // Si gotrip tiene una fecha, debe ser menor a startwork
                if (this.goTrip !== null && value !== null) {
                    return this.goTrip < value;
                }
                //si category es LOGISTIC, startWork debe ser null
                if (this.category !== "LOGISTIC" && value !== null ) {
                    return false;
                }
                return true;
            },
            message: "startWork solo puede tener una fecha si goTrip es null o anterior a startWork"
        } */

    },
    endWork: {
        type: Date,
        default: null,
        /* validate: {
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
        } */
    },
    backTrip: {
        type: Date,
        default: null,
        /* validate: {
            validator: function(value) {
                // Solo puede ser distinto de null si enwork tambien lo es o si no es REMOTE
                //if (this.endWork === null && value !== null && this.category !== "REMOTE") {
                //    return false;
                //}
                // Si endWork tiene una fecha, debe ser menor a backTrip
                if (this.endWork !== null && value !== null) {
                    return this.endWork < value;
                }
                return true;
            },
            message: "backTrip solo puede tener una fecha si endWork tiene una fecha anterior a endWork  y si category es ON PREMISE o LOGISTIC"
        } */

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
      /* validate: {
        validator: function(value) {
            // Solo valida si startWork no es null
            return value === null || this.category !== "REMOTE";
        },
        message: "transport solo puede ser diferente a null si category es ON PREMISE"
        } */
    },
    tripCost: {
        type: Number,
        default: null,
        /* validate: {
            validator: function(value) {
                // Solo valida si startWork no es null
                return value === null || this.goTrip in ["AUTO", "T.PUBLICO"];
            },
            message: "tripCost solo puede tener un valor si tripCost no es null"
        } */

    },
    state: {
        type: String,
        default: 'WAITING',
        enum: ['WAITING','STARTED','FINISHED']
    }
    })

taskSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task