import { ApiError } from "../utils/Apierror.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const option = {
  httpOnly: true,
  secure: true,
  maxAge: 1000 * 60 * 60 * 24 * 1,
};

const sellerlogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Email and Password must be required.");
  }
  if (
    email === process.env.SELLER_EMAIL &&
    password === process.env.SELLER_PASSWORD
  ) {
    const token = jwt.sign(
      {
        email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    return res
      .status(200)
      .cookie("sellerToken", token, option)
      .json(
        new ApiResponse(200, { sellerToken: token }, "seller login success.")
      );
  } else {
    throw new ApiError(400, "Not Authorized with this email and Password");
  }
});

const sellerLogout = asyncHandler(async(req,res)=>{
    res.status(200)
       .clearCookie("sellerToken",option)
       .json(new ApiResponse(200, {}, "Seller logout Successfully"));
})

export { sellerlogin,sellerLogout };
