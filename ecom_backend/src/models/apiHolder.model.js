import mongoose, { Schema } from "mongoose";

const apiHolderSchema = new Schema({
   route:{
      type: String,
      required: true,
   },
   method:{
      type: ['get', 'post', 'put', 'delete', 'patch', 'head', 'options'],
      required: true,
   },
  description:{
    type: String,
  },
  },
  {
    timestamps: true
});

export const apiHolder = mongoose.model("apiHolder", apiHolderSchema)