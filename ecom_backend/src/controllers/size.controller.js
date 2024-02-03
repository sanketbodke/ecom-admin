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

const getSizes = asyncHandler(async (req,resp) => {
  try{
    const sizesResponse = await size.find({})
    if(!sizesResponse){
      new ApiError(404, "size not found")
    }
    return resp.status(200).json(
        new ApiResponse(200, sizesResponse, "size fetched successfully")
    )
  }catch (error){
    throw new ApiError(404, error, "Sizes not found")
  }
})

const getSizeById = asyncHandler(async (req,resp)=> {
  try{
    const id = req.params.id;
    const sizeResponse = await size.findById(id);
    if(!sizeResponse){
      new ApiError(404, "size not found")
    }
    return resp.status(200).json(
        new ApiResponse(200, sizeResponse, "size fetched successfully")
    )
  }catch (error){
    throw new ApiError(404, error,"size not found")
  }
})

const updateSize = asyncHandler(async (req,resp)=> {
  try{
    const id = req.params.id;
    const sizeResponse = await size.findByIdAndUpdate(
        id,
        req.body,{new: true}
    )
    if(!sizeResponse){
      new ApiError(404, "size not found")
    }
    return resp.status(200).json(
        new ApiResponse(200, sizeResponse, "size updated")
    )
  }catch (error){
    throw new ApiError(404, error,"size not found")
  }
})

const deleteSize = asyncHandler(async (req,resp)=> {
  try{
    const id = req.params.id;
    const sizeResponse = await size.findByIdAndDelete(id);
    if(!sizeResponse){
      new ApiError(404, "size not found")
    }
    return resp.status(200).json(
        new ApiResponse(200, sizeResponse, "size deleted")
    )
  }catch (error){
    throw new ApiError(404, error,"size not found")
  }
})

export {
  addSize,
  getSizes,
  getSizeById,
  updateSize,
  deleteSize
}