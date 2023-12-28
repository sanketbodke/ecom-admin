import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  featured:{
    type: Boolean
  },
  price:{
    type: String,
    required: true,
  },
  productImage:{
    type: String,
    required: true,
  },
  category:{
    type: String,
    required: true
    // type: mongoose.Types.ObjectId,
    // ref: "category",
  },
  size:{
    type: String,
    required: true
    // type: mongoose.Types.ObjectId,
    // ref: "size",
  },
  color:{
    type: String,
    required: true
    // type: mongoose.Types.ObjectId,
    // ref: "color",
  },
}, {timestamps: true})

export const product = mongoose.model("product", productSchema)