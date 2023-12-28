import mongoose, { Schema } from "mongoose";

const billBoardSchema = new Schema({
  coverImage:{
    type: String,
  },
  label:{
    type: String,
    required: true,
    unique: true,
  },
}, {timestamps: true})

export const billBoard = mongoose.model("billboard", billBoardSchema);