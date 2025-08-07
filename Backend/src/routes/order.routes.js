import { Router } from "express";
const orderRouter = Router();
import authSeller from "../middleware/authSeller.middleware.js";
import authUser from "../middleware/authUser.middleware.js"; 
import { changeCarStatus, getAllProduct, placeOrder, singleUserProduct } from "../Controllers/order.controller.js";

orderRouter.get("/getallproducts",authSeller,getAllProduct);
orderRouter.get("/singleuserproduct",authUser,singleUserProduct);
orderRouter.post("/placeorder",authUser,placeOrder);
orderRouter.put("/changeStatus",authSeller,changeCarStatus)
export default orderRouter;


