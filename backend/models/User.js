const mongoose = require("mongoose");
const { Schema } = mongoose;

/*1. First Name
2. Last Name
DASS Assignment 1
13. User Name
4. Email [Unique]
5. Age
6. Contact Number
7. Password */

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  followers:{
    type : Array
  },
  following :{
  type: Array
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("user", UserSchema);
module.exports = User;
