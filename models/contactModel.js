const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide the name"]
    },
    email: {
        type: String,
        required: [true, "please provide the email"]
    },
    phone: {
        type: String,
        required: [true, "please provide the phone number"]
    },
},{
    timestamps: true,
})

module.exports = mongoose.model("Contact", contactSchema);