import mongoose, { Schema } from "mongoose";

const colorSchema = new Schema({
  name:{
    type: String,
    required: true,
    unique: true,
  },

  value:{
    type: String,
    required: true,
    unique: true,
  },
}, {timestamps: true})

export const color = mongoose.model("color", colorSchema)