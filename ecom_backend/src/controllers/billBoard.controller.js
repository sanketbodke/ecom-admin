import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { billBoard } from "../models/billBoard.model.js";

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

  // store on database

  const createdBillBoard = await billBoard.create({
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