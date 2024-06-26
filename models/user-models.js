const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname: {
        type:String,
        trim: true,
        minLength:3,
        maxLength:100,
    },
    email: String,
    password: String, 
    cart: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "product",
    }],
    order:{
        type:Array,
        default:[]
    },
    contact:Number,
    picture:String,
});

module.exports = mongoose.model("user", userSchema);