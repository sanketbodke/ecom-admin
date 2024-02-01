import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
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

const getProducts = asyncHandler(async (req,resp)=> {
  try{
    const productsResponse = await product.find({});
    if(!productsResponse){
      new ApiError(404, "Products not found")
    }
    return resp.status(200).json(
        new ApiResponse(200, productsResponse, "Products fetched Successfully")
    )
  }catch (error){
    throw new ApiError(404, error, "Products not found")
  }
})

const getProductById = asyncHandler(async (req,resp)=> {
  try{
    const id = req.params.id;
    const productResponse = await product.findById(id);
    if(!productResponse){
      new ApiError(404, "Product not found")
    }
    return resp.status(200).json(
        new ApiResponse(200, productResponse, "Product found")
    )
  }catch (error){
    throw new ApiError(404, error, "Product not found")
  }
})

const updateProduct = asyncHandler(async (req,resp)=> {
  try{
    const id = req.params.id;
    const productResponse = await product.findByIdAndUpdate(
        id,
        req.body, {new: true}
    )
    if(!productResponse){
      new ApiError(404, "Product not found")
    }

    return resp.status(200).json(
        new ApiResponse(200, productResponse, "Product fetched successfully")
    )
  }catch (error){
    new ApiError(404, error ,"Error to update product")
  }
})

const deleteProduct = asyncHandler(async(req,resp)=> {
  try{
    const id = req.params.id;
    const productResponse = await product.findByIdAndDelete(id);
    if(!productResponse){
      new ApiError(404, "Product not found")
    }
    return resp.status(200).json(
        new ApiResponse(200, productResponse, "Product deleted")
    )
  }catch (error){
    throw new ApiError(404,error, "Product not found")
  }
})

export {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
}