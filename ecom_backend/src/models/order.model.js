import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  userId:{
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  pId:{
    type: mongoose.Types.ObjectId,
    ref: "product",
  },
}, {timestamps: true})

export const Order = mongoose.model("Order", orderSchema)