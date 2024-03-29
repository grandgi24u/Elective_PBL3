"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: String,
    firstname: String,
    email: String,
    password: {
        type: String,
        required: true
    }
});
const User = mongoose.model('user', UserSchema);
module.exports = User;
