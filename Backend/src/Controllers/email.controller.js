import { ApiError } from "../utils/Apierror.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Email } from "../models/Email.models.js";


const addEmail = asyncHandler(async(req,res)=>{
  const{email} = req.body;

  if(!email){
    throw new ApiError(404,"Email is Required");
  }

  const existing = await Email.findOne({email});
  if(existing)
    {
      throw new ApiError(400,"Email Subscribed Already")
    }  
    const newEmail = await Email.create({email});

    res.status(200).json(new ApiResponse(200),newEmail,"Email Subscribed Successfully.");
})

const getEmail = asyncHandler(async (req, res) => {
  const email = await Email.find({});

  res.status(200).json(new ApiResponse(200, email, "Emails Fetched Successfully"));
});

export{getEmail,addEmail};