import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { category } from "../models/category.model.js";
import {billBoard} from "../models/billBoard.model.js";

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

const getCategories = asyncHandler(async (req,resp)=> {
  try{
    const categoriesData = await category.find({});
    if(!categoriesData){
      new ApiError(404, "Categories not found")
    }
    return resp.status(200).json(
        new ApiResponse(200, categoriesData, "Categories fetched successfully")
    )
  }catch (error){
    throw new ApiError(404, "Categories not found")
  }
})

const getCategoryById = asyncHandler(async (req,resp)=> {
  try{
    const id = req.params.id;
    const categoriesResponse = await category.findById(id);
    if(!categoriesResponse){
      new ApiError(404, "Category not found")
    }
    return resp.status(200).json(
        new ApiResponse(200, categoriesResponse, "Category fetched Successfully")
    )
  }catch (error){
    throw new ApiError(404, "Category not found")
  }
})

const updateCategory = asyncHandler(async (req,resp) => {
  try{
    const id = req.params.id;
    const categoryResponse = await category.findByIdAndUpdate(
        id,
        req.body, {new: true}
    )
    if(!categoryResponse){
      new ApiError(404, "Category not found")
    }
    return resp.status(200).json(
        new ApiResponse(200, categoryResponse, "Category updated Successfully")
    )
  }catch (error){
    throw new ApiError(404, "Category not found")
  }
})

const deleteCategory = asyncHandler(async(req,resp)=> {
  try{
    const id = req.params.id;
    const categoryResponse = await category.findByIdAndDelete(id);
    if(categoryResponse.data == null){
      new ApiError(404, "Category not found")
    }
    return resp.status(200).json(
        new ApiResponse(200, categoryResponse, "category deleted")
    )
  }catch (error){
    throw new ApiError(404, "Category not found")
  }
})

const getCategoryData = asyncHandler(async (req,resp) => {
  try {
    const categoryParams = req.params.category;
    const categoryResponse = await category.findOne({ name: categoryParams });

    if (!categoryResponse) {
      return new ApiError(404, "Category data not found");
    }

    const billBoardResponse = await billBoard.findOne({ label: categoryResponse.content });

    if (!billBoardResponse) {
      return new ApiError(404, "Billboard data not found");
    }

    return resp.status(200).json(
        new ApiResponse(200, billBoardResponse, "Billboard content")
    );
  } catch (error) {
    throw new ApiError(404, error.message, "Category not found");
  }
})

export {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getCategoryData
}