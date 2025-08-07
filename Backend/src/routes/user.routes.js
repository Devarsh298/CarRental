import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../Controllers/user.controller.js";
import authUser from "../middleware/authUser.middleware.js";

const userRouter = Router();

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/logout",authUser,logoutUser)

export default userRouter;
