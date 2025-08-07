import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        pickupDate:{
            type:Date,
            required:true
        },
        returnDate:{
            type:Date,
            required:true
        },
        item:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        },
        totalDays:{
            type:Number,
            required:true
        },
        totalAmount:{
            type:Number,
            required:true
        },
        carStatus:{
            type:String,
            enum : ["Pending","Confirm","Cancel"],
            default:"Pending"
        }
    }
)


export const Order = mongoose.model("Order",orderSchema);