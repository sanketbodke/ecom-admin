import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

const generateAccessAndRefreshToken = async(userId)=>{
  try{
    const user = await User.findById(userId)
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave : false})

    return { accessToken, refreshToken }

  } catch (error){
    throw new ApiError(500, "Something went wrong while generating access and refresh token")
  }
}
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
    avatar: avatar.url,
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

const loginUser = asyncHandler(async (req,resp) => {
  // data from frontend

  const {username, email, password} = req.body;

  // validation

  if(!username || !email){
    throw new ApiError(400, "Username and email required")
  }

  // find user

  const user = await User.findOne({
    $or: [{username}, {email}]
  });

  if(!user){
    throw new ApiError(400, "User does not exist")
  }

  // password check

  const isPasswordCheck = await user.isPasswordCorrect(password)

  if(!isPasswordCheck){
    throw new ApiError(401, "Invalid Password")
  }

  // access and refresh token

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

  const loggedInUser = await User.findById(user._id).select(" --password --refreshToken")

  // send cookies

  const options = {
    httpOnly: true,
    secure: true
  }

  return resp
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser, accessToken, refreshToken
        },
        "User logged in successfully"
      )
    )
})

const logoutUser = asyncHandler(async (req,resp)=>{
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set:{
        refreshToken: undefined
      }
    },
    {
      new: true
    }
  )
  const options = {
    httpOnly: true,
    secure: true
  }

  return resp
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"))
})

export {
  registerUser,
  loginUser,
  logoutUser
}