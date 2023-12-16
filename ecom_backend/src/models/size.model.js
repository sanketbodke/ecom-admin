import mongoose, { Schema } from "mongoose";

const sizeSchema = new Schema({
 name:{
   type: String,
   required: true,
 },

  value:{
    type: String,
    required: true,
  },
}, {timestamps: true})

export const size = mongoose.model("size", sizeSchema)