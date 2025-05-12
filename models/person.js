const mongoose = require("mongoose");

const personSchema = new mongoose.Schema( {
    name: {
        type:String,
        minLength:3
    },
    number: {
        type:String,
        validate: {
            validator: function(value) {
                return /^\d{2,3}-\d{4,}$/.test(value);
            },
            message: props => `${props.value} is not a valid number. Must be 09-1234556 or 040-22334455 format`
        }
    }
  })

personSchema.set("toJSON", {
    transform:(document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)