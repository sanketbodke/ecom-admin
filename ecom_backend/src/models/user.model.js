import mongoose, { Schema } from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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
  },

  refreshToken:{
   type: String
  },

  cart:[{
        type: mongoose.Types.ObjectId,
        ref: "product",
  }],

  orders:[{
    type: mongoose.Types.ObjectId,
    ref: "Order",
  }],
}, {
    timestamps: true,
});

userSchema.pre("save" , async function(next){
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10)
    next()
  } else
      return next()
})

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function(){
  return jwt.sign({
    _id: this.id,
    email: this.email,
    username: this.username,
    fullName: this.fullName
  },
  process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  })
}

userSchema.methods.generateRefreshToken = async function(){
  return jwt.sign({
    _id: this.id,
  },
   process.env.REFRESH_TOKEN_SECRET,{
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
   })
}

export const User = mongoose.model("User", userSchema)