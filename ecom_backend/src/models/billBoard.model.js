import mongoose, { Schema } from "mongoose";

const billBoardSchema = new Schema({
  label:{
    type: String,
    required: true,
    unique: true,
  },
}, {timestamps: true})

export const billBoard = mongoose.model("billboard", billBoardSchema);