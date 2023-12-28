import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { category } from "../models/category.model.js";

const createCategory = asyncHandler(async (req,resp)=> {
  // get data from frontend

  const { name, content } = req.body;

  if(
    [name, content].some((fields)=> fields.trim() === "")
  ) {
    throw new ApiError(400, "Fields are required")
  }

  // check if label already exist

  const existedCategory = await category.findOne({name})

  if(existedCategory){
    throw new ApiError(409, "Category already exist")
  }


  // store on database

  const createdCategory = await category.create({
    name,
    content
  })

  // return response

  return resp.status(201).json(
    new ApiResponse(200, createdCategory, "Category Created Successfully!")
  )
})

export {
  createCategory,
}