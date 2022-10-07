const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    userId:{type:String},    
    products: [
        {
            productId: {
                type: String,
            },
            status:{
                type:String
            }
        },
    ],
    address:{type:String}
  }
);

module.exports = mongoose.model("Order", Schema);