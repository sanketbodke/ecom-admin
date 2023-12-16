import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  userId:{
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  pId:{
    type: mongoose.Types.ObjectId,
    ref: "product",
  },
}, {timestamps: true})

export const product = mongoose.model("product", productSchema)