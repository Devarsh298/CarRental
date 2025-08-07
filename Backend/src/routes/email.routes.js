import { Router } from "express";
const emailRouter = Router();

import {addEmail, getEmail } from "../Controllers/email.controller.js";
import authUser from "../middleware/authUser.middleware.js";

emailRouter.post("/add",addEmail)
emailRouter.post("/getemail",authUser,getEmail);

export default emailRouter;
