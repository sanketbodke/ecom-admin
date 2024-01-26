import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { billBoard } from "../models/billBoard.model.js";

const generateBillBoard = asyncHandler(async (req,resp)=> {
  // get data from frontend

  const { label, coverImage } = req.body;

  if(
    [label, coverImage].some((fields)=> fields.trim() === "")
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
    coverImage
  })

  // return response

  return resp.status(201).json(
    new ApiResponse(200, createdBillBoard, "Bill Board Created Successfully!")
  )
})

const getAllBillBoards = asyncHandler(async (req,resp) => {
  try{
    const billBoards = await billBoard.find({})
    return resp.status(200).json(
        new ApiResponse(200, billBoards, "BillBoards Fetched Successfully")
    )
  } catch (error){
     throw new ApiError(404, "Error to fetch billboard")
  }
})

const getBillBoardById = asyncHandler(async (req,resp)=> {
  try{
    const billBoardId = req.params.id;
    const billBoardResponse = await billBoard.findById(billBoardId)
    if(!billBoardResponse){
      throw new ApiError(404, "BillBoard not found")
    }
    return resp.status(200).json(
        new ApiResponse(200,billBoardResponse, "BillBoard Fetched Successfully")
    )
  }catch (error){
    throw new ApiError(404, "Error to fetch billBoard")
  }
})

export {
  generateBillBoard,
  getAllBillBoards,
  getBillBoardById
}