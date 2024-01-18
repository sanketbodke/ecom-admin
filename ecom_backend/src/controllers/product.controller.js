import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { product } from "../models/product.model.js";

const addProduct = asyncHandler(async (req,resp)=> {
  // get details from frontend

  const { name, featured, price, category, size, color } = req.body;

  // validation

  if(
    [name, featured, price, category, size, color].some((fields) => fields.trim() === "")
  ){
    throw new ApiError(400, "All fields are required")
  }

  // check if product already exist

  const existedProduct = await product.findOne({
    $and: [{name}, {category}]
  })

  if (existedProduct) {
    throw new ApiError(409, "Product already exists")
  }

  // create product object

  const createdProduct = await product.create({
    name,
    featured,
    price,
    category,
    size,
    color,
    productImage: "managed by frontend"
  })

  // return response

  return resp.status(201).json(
    new ApiResponse(200, createdProduct, "Product Created Successfully")
  )
})

export {
  addProduct
}