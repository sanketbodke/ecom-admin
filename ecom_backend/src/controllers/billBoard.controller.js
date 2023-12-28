import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { billBoard } from "../models/billBoard.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateBillBoard = asyncHandler(async (req,resp)=> {
  // get data from frontend

  const { label } = req.body;

  if(
    [label].some((fields)=> fields.trim() === "")
  ) {
    throw new ApiError(400, "label are required")
  }

  // check if label already exist

  const existedLabel = await billBoard.findOne({label})

  if(existedLabel){
    throw new ApiError(409, "Label already exist")
  }

  // check cover img

  const coverImageLocalPath = req.files?.coverImage?.[0]?.path

  if(!coverImageLocalPath){
    throw new ApiError(400, "CoverImage Required")
  }

  // upload on cloudinary

  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if(!coverImage){
    throw new ApiError(400, "coverImage is required")
  }

  // store on database

  const createdBillBoard = await billBoard.create({
    coverImage: coverImage.url,
    label,
  })

  // return response

  return resp.status(201).json(
    new ApiResponse(200, createdBillBoard, "Bill Board Created Successfully!")
  )
})

export {
  generateBillBoard,
}