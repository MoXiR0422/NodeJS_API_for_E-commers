const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    title:{type:String},
    desc: { type: String },
    img: { type: Array },
    categories: { type:Array },
    sizes:[{
      size:{type:Array},
      limit:{type:Array}
    }],
    color: { type: Array },
    price: { type: Number},
    data:{type:String}
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductlarMale", Schema);