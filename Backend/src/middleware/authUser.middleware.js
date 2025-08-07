import jwt from "jsonwebtoken";
import { ApiError } from "../utils/Apierror.js";
import { User } from "../models/User.models.js";

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.AccessToken;
    if (!token) {
      throw new ApiError(400, "Unauthorized Access.");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedToken) {
      throw new ApiError(403,"Token Invalid");
    }

    const user = await User.findById(decodedToken._id)
    if(!user)
    {
        throw new ApiError(404,"Invalid User Access Token");
    }

    req.user = user;
    next();

  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export default authUser;
