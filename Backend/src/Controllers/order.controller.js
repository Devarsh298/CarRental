import { ApiError } from "../utils/Apierror.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Order } from "../models/order.models.js";

const getAllProduct = asyncHandler(async (req, res) => {
  const order = await Order.find({}).populate("userId item");
  if (!order) {
    throw new ApiError(400, "Order not Found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, order, "All Items Are Fetched Successfully."));
});

const singleUserProduct = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const order = await Order.find({ userId }).populate("item");
  if (!order) {
    throw new ApiError(400, "no items Found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, order, "All Items Are Fetched Successfully."));
});

const placeOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { item, pickupDate, returnDate, dayDifference, totalPrice } = req.body;
  if (
    item === 0 ||
    !pickupDate ||
    !returnDate ||
    !dayDifference ||
    !totalPrice
  ) {
    throw new ApiError(400, "Invalid Data To be Placed");
  }
  const createOrder = await Order.create({
    userId,
    pickupDate,
    returnDate,
    item,
    totalDays: dayDifference,
    totalAmount: totalPrice,
  });
  if (!createOrder) {
    throw new ApiError(400, "Order not Found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, createOrder, "Order Placed Successfully."));
});

const changeCarStatus = asyncHandler(async (req, res) => {
  const { orderId, carStatus } = req.body;
  if (!orderId || !carStatus) {
    throw new ApiError(400, "please provide valid data");
  }
  const order = await Order.findByIdAndUpdate(orderId, { carStatus });

  if (!order) {
    throw new ApiError(404, "order not found with provided ID");
  }

  res.status(200).json(new ApiResponse(200, order, "Order Status Updated."));
});

export { getAllProduct, singleUserProduct, placeOrder, changeCarStatus };
