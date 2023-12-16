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
  image:{
    type: String,
    required: true,
  },
  category:{
    type: mongoose.Types.ObjectId,
    ref: "category",
  },
  size:{
    type: mongoose.Types.ObjectId,
    ref: "size",
  },
  color:{
    type: mongoose.Types.ObjectId,
    ref: "color",
  },
}, {timestamps: true})

export const product = mongoose.model("product", productSchema)