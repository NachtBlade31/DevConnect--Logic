const mongoose = require('mongoose');

const newUser = {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

}
const UserSchema = new mongoose.Schema(newUser);
const User = mongoose.model("User", UserSchema);
module.exports = User;