const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "username required"],
        unique: [true, "this username is already in use"]
    },
    email: {
        type: String,
        required: [true, "email required"],
        unique: [true, "this email is already in use"]
    },
    password: {
        type: String,
        required: [true, "password required"],
    }
},{
    timestamps : true
})

module.exports = mongoose.model("User", userSchema);