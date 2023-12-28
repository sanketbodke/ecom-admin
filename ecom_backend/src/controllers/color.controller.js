import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { color } from "../models/color.model.js";

const addColor  = asyncHandler(async (req,resp)=> {
  // data from frontend

  const { name, value } = req.body;

  if(
    [name,value].some((field) => field.trim() === "")
  ){
    throw new ApiError(409, "All fields must required")
  }

  // validation

  const existedColor = await color.findOne({
    $and: [{name}, {value}]
  })

  if(existedColor){
    throw new ApiError(401,"Color Already Exist")
  }

  // store to db

  const createdColor = await color.create({
    name,
    value
  })

  // return resp

  return resp.status(201).json(
    new ApiResponse(200, createdColor, "Color Created Successfully!")
  )

})

export {
  addColor
}