import { Router } from "express";
const productRouter = Router();
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../Controllers/product.controller.js";
import authSeller from "../middleware/authSeller.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

productRouter.post("/add",upload.single("image"),authSeller,addProduct);
productRouter.get("/getAllProducts",getAllProducts);
productRouter.get("/getProductsById/:id",getProductById);
productRouter.put("/updateProduct/:id",authSeller,updateProduct)
productRouter.delete("/deleteProduct/:id",authSeller,deleteProduct);



export default productRouter;