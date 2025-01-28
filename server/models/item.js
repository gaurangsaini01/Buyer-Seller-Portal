const mongoose = require("mongoose")
const User = require("./user");
const itemSchema = new mongoose.Schema({
    itemName:{
        type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    category:{
        type:String
    },
    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

const Item = mongoose.model("Item",itemSchema);
module.exports = Item