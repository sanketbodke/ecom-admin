import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler (async (req,resp) => {
  // get details from frontend

  const { username, fullName, email, password } = req.body;

  // validation

  if(
    [username, fullName, email, password].some((fields)=> fields.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required")
  }

  // check if student already exists

  const existedUser = await User.findOne({
    $or: [{username}, {email}]
  })

  // check avatar

  const avatarLocalPath = req.files?.avatar?.[0]?.path;

  if(!avatarLocalPath){
    throw new ApiError(400, "Avatar is required")
  }

  // upload avatar on cloudinary

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if(!avatar){
    throw new ApiError(400, "Avatar is required")
  }

  // create user object

  const user = await User.create({
    username,
    fullName,
    email,
    password,
    avatar: "todo",
  })

  // remove password and refresh token from response

  const createdUser = await User.findById(user._id).select(
    "--password -refreshToken"
  )

  // check for the creation

  if(!createdUser){
    throw new ApiError("Something went wrong while registering user")
  }

  // return response

  return resp.status(201).json(
    new ApiResponse(200, createdUser, "User Register Successfully")
  )
})

export { registerUser }