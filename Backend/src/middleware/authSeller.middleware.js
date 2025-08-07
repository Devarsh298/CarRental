import jwt from "jsonwebtoken";
import { ApiError } from "../utils/Apierror.js";


const authSeller = async (req, res, next) => {
  try {
    const token = req.cookies.sellerToken;
    if (!token) {
      throw new ApiError(400, "Unauthorized Access.");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedToken) {
      throw new ApiError(403,"Token Invalid");
    }

   if(decodedToken.email === process.env.SELLER_EMAIL)
   {
    next();
   }
   else{
    throw new ApiError(400,"Unathorized Request");
   }

  }
 catch (error) {
    throw new ApiError(500, error.message);
  }
}

export default authSeller;
