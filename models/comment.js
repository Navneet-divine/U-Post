const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commnetSchema = new Schema({
  rating:{
    type:String,
  },
  comment:{
    type:String,
  },
  author:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }
});

module.exports = mongoose.model("Comment", commnetSchema);