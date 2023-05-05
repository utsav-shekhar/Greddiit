const mongoose = require("mongoose");
const { Schema } = mongoose;


const SgSchema = new Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "user"
  },
 
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    lowercase: true,
    required: true
  },
  bannedkeywords: {
    type: String,
    lowercase: true,
    // required : true
  },
  followers: {
    type: Array,
    // required: true,
  },
  users :{
    type:Array
  },

  requests: {
    type: Array,
  },
  posts:{
    type : Array
  }
});
const Sg = mongoose.model("sg", SgSchema);
module.exports = Sg;

