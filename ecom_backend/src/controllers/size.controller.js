import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { size } from "../models/size.model.js";

const addSize  = asyncHandler(async (req,resp)=> {
  // data from frontend

  const { name, value } = req.body;

  if(
    [name,value].some((field) => field.trim() === "")
  ){
    throw new ApiError(409, "All fields must required")
  }

  // validation

  const existedSize = await size.findOne({
    $and: [{name}, {value}]
  })

  if(existedSize){
    throw new ApiError(401,"Size Already Exist")
  }

  // store to db

  const createdSize = await size.create({
    name,
    value
  })

  // return resp

  return resp.status(201).json(
    new ApiResponse(200, createdSize, "Size Created Successfully!")
  )

})

export {
  addSize
}