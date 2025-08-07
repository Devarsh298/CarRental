import { Router } from "express";
import { sellerlogin, sellerLogout } from "../Controllers/seller.controller.js";
import authSeller from "../middleware/authSeller.middleware.js";

const sellerRouter = Router();

sellerRouter.post("/login",sellerlogin);
sellerRouter.get("/logout",authSeller,sellerLogout);

export default sellerRouter;
