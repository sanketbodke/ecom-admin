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
  },
  size:{
    type: String,
    required: true
  },
  color:{
    type: String,
    required: true
  },
  quantity:{
    type: Number,
    default: 1
  }
}, {timestamps: true})

export const product = mongoose.model("product", productSchema)