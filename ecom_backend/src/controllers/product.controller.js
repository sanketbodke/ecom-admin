import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

// add product
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

// get products

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

// get product by id

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

// update product

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

// delete product

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

// get product data by category

const getProductByCategory = asyncHandler(async (req,resp) => {
  try{
    const category = req.params.category;

    const productResponse = await product.find({category})

    if(!productResponse){
      return new ApiError(404, "Product not found")
    }

    return resp.status(200).json(
        new ApiResponse(200, productResponse, "Product found")
    )
  }catch (error){
    throw new ApiError(404, error, "Product not found")
  }
})

// add to cart

const addToCartProduct = asyncHandler(async (req,resp) => {
  const productId = req.body.productId;
  const userId = req.body.userId;

  try{
    const productDetails = await product.findById(productId);
    const userDetails = await User.findById(userId);

    if(!productDetails){
      return new ApiError(404,"product not found");
    }

    if(!userDetails){
      return new ApiError(404,"user not found");
    }

    userDetails.cart.push(productDetails);
    await userDetails.save({ validateBeforeSave : false})

    return resp.status(200).json(
        new ApiResponse(200, userDetails, 'Product added to cart')
    )

  }catch (error){
    throw new ApiError(400, error ,`failed to add`)
  }
})

// get cart products

const getCartProducts = asyncHandler(async (req,resp) => {
  const user = await User.findById(req.params.id);

  if(!user){
    return new ApiError(404, "User not found")
  }

  const cartProducts = await product.find({
    _id: {$in: user.cart},
  });

  if(!cartProducts){
    return new ApiError(404, "cart is empty")
  }

  return resp.status(200).json(
      new ApiResponse(200, cartProducts, "Cart Products")
  )
})

const getProductBySize = asyncHandler(async (req, resp) => {
  try {
    const reqQuery = req.query;
    const conditions = {};

    for (const key in reqQuery) {
      conditions[key] = reqQuery[key];
    }

    const products = await product.find(conditions);

    if (!products || products.length === 0) {
      return resp.status(404).json(new ApiResponse(404, null, "Product not found"));
    }

    return resp.status(200).json(new ApiResponse(200, products, "Products found"));

  } catch (error) {
    console.log(error);
    return resp.status(500).json(new ApiResponse(500, null, "Internal server error"));
  }
});


export {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductByCategory,
  addToCartProduct,
  getCartProducts,
  getProductBySize,
}