const mongoose = require("mongoose");
const { Schema } = mongoose;
/*1. Text
2. Posted By
3. Posted In
4. Upvotes
5. Downvotes*/

const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  postedby: {
    type: String,
  },
  postedin: {
    type: String,
  },
  upvotes: {
    type: Number,
  },
  downvotes: {
    type: Number,
  },
  subgredditID:{
    type : String,
  },
  saved:{
   type : Boolean,
  }
});


module.exports = mongoose.model("notes", NotesSchema);
