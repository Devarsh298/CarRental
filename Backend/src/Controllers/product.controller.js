import { ApiError } from "../utils/Apierror.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/Product.models.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";

const addProduct = asyncHandler(async (req, res) => {
  const {
    brand,
    model,
    year,
    dailyPrice,
    category,
    seatingCapacity,
    transmission,
    fuelType,
    location,
    description,
  } = req.body;

  if (
    [
      brand,
      model,
      year,
      dailyPrice,
      category,
      seatingCapacity,
      transmission,
      fuelType,
      location,
      description,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field are reuired.");
  }

  const existProduct = await Product.findOne({ $and: [{ model }, { brand }] });

  if (existProduct) {
    throw new ApiError(400, "Product Already Exists");
  }

  const productImageLocalPath = req.file?.path;
  //   console.log(productImageLocalPath);

  if (!productImageLocalPath) {
    throw new ApiError(400, "Product Image file is required.");
  }

  const productImage = await uploadOnCloudinary(productImageLocalPath);
  //   console.log(productImage);

  if (!productImage) {
    throw new ApiError(400, "Issues when uploading file try agains later.");
  }

  const productData = {
    brand,
    model,
    year,
    dailyPrice,
    category,
    seatingCapacity,
    transmission,
    fuelType,
    location,
    description,
    image: productImage.url || "",
  };

  const product = await Product.create(productData);

  if (!product) {
    throw new ApiError(400, "error when creating product");
  }
  res
    .status(201)
    .json(new ApiResponse(201, product, "Product Created Successfully."));
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product Not Found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, product, "Product Fetched Successfully"));
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  if (!products) {
    throw new ApiError(404, "Products Not Found");
  }
  // console.log("Products Fetched", products);

  res
    .status(200)
    .json(new ApiResponse(200, products, "All Products Fetched Successfully"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  if (!updatedData) {
    throw new ApiError(400,"Must provide data")
  }

  const updateProduct = await Product.findByIdAndUpdate(id,updatedData,{
    new:true,
    runValidators:true
  });

  if (!updateProduct) {
    throw new ApiError(404, "Product Not Found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, updateProduct, "Product Updated Successfully."));
});

const deleteProduct = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const deleteProduct = await Product.findByIdAndDelete(id);
  if (!deleteProduct) {
    throw new ApiError(404, "Product not Found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, deleteProduct, "Product Deleted Successfully"));
});

export {
  addProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
