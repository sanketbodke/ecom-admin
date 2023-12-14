import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new Schema({
 username:{
   type: String,
   required: true,
   unique: true,
   lowercase: true,
   trim: true,
   index: true,
 },

  fullName:{
    type: String,
    required: true,
    trim: true,
    index: true,
  },

  email:{
    type: String,
    required: true,
    trim: true,
    index: true,
  },

  password:{
    type: String,
    required: [true, "Password is required"],
  },

  avatar:{
   type: String,
    required: true,
  },

  refreshToken:{
   type: String
  },

  // orders:{}
}, {
    timestamps: true,
  });