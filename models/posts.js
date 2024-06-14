const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  Image:{
    type:String,
  },
  description:{
    type:String,
  },
  comments:[
    {
      type:Schema.Types.ObjectId,
      ref:"Comment",
    }
  ],
  author:{
    type:Schema.Types.ObjectId,
    ref:"User",
  }
})


module.exports = mongoose.model("Post",postSchema);