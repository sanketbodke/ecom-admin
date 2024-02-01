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

const getColor = asyncHandler(async (req,resp)=> {
  try{
    const colorsData = await color.find({});
    if(!colorsData){
      new ApiError(404, "Colors not found")
    }
    return resp.status(200).json(
        new ApiResponse(200, colorsData, "Colors fetched successfully")
    )
  }catch (error){
    throw new ApiError(404, "Colors not found")
  }
})

const getColorById = asyncHandler(async (req,resp)=> {
  try{
    const id = req.params.id;
    const response = await color.findById(id);
    if(!response){
      new ApiError(404, "Color not found")
    }
    return resp.status(200).json(
        new ApiResponse(200, response, "Color fetched Successfully")
    )
  }catch (error){
    throw new ApiError(404, error,"Color not found")
  }
})

const updateColor = asyncHandler(async (req,resp) => {
  try{
    const id = req.params.id;
    const colorResponse = await color.findByIdAndUpdate(
        id,
        req.body, {new: true}
    )
    if(!colorResponse){
      new ApiError(404, "Color not found")
    }
    return resp.status(200).json(
        new ApiResponse(200, colorResponse, "Color updated Successfully")
    )
  }catch (error){
    throw new ApiError(404, error,"Color not found")
  }
})

const deleteColor = asyncHandler(async(req,resp)=> {
  try{
    const id = req.params.id;
    const colorResponse = await color.findByIdAndDelete(id);
    if(colorResponse.data == null){
      new ApiError(404, "Color not found")
    }
    return resp.status(200).json(
        new ApiResponse(200, colorResponse, "Color deleted")
    )
  }catch (error){
    throw new ApiError(404, "Color not found")
  }
})

export {
  addColor,
  getColor,
  getColorById,
  updateColor,
  deleteColor
}