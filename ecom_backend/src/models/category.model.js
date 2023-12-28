import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  name:{
    type: String,
    required: true,
    unique: true,
  },
  // content:{
  //   type: Schema.Types.ObjectId,
  //   ref: "billboard",
  // }
  content:{
    type: String, // billBoard content
    required: true
  }
}, {timestamps: true});

export const category = mongoose.model("category", categorySchema);