import { User } from "../models/User.models.js";
import { ApiError } from "../utils/Apierror.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const option = {
  httpOnly: true,
  secure: true,
  maxAge: 1000 * 60 * 60 * 24 * 1,
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, mobile, password } = req.body;

  if (
    [fullname, email, mobile, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field required.");
  }

  console.log(req.body);

  const exists = await User.findOne({ email });
  if (exists) {
    throw new ApiError(400, "User already exists. ");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const createUser = await User.create({
    fullname: fullname.toLowerCase(),
    email,
    mobile,
    password: hashPassword,
  });

  const user = await User.findOne({ email }).select("-password");

  if (!createUser) {
    throw new ApiError(400, "error while registering user");
  }

  res.status(201).json(new ApiResponse(201, user, "User Register Success"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(401, "Email and Password are required");
  }

  const findUser = await User.findOne({ email });

  if (!findUser) {
    throw new ApiError(401, "Invalid Credentials");
  }

  const iscorrectPassword = await bcrypt.compare(password, findUser.password);

  if (!iscorrectPassword) {
    throw new ApiError(401, "Passsword is Incorrect");
  }

  const token = await jwt.sign(
    { _id: findUser._id, email: findUser.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );

  const user = await User.findOne({ email }).select("-password")

  
  res
    .status(200)
    .cookie("AccessToken", token, option)
    .json(new ApiResponse(200, { token, user }, "user Login Successfully"));

});

const logoutUser = asyncHandler(async(req,res)=>{
  res
    .status(200)
    .clearCookie("AccessToken",option)
    .json(new ApiResponse(200, {}, "user logout Successfully"));
}) 

export { registerUser, loginUser,logoutUser };
