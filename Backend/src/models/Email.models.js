import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },

},{timestamps:true});

export const Email = mongoose.model("Email", emailSchema);
