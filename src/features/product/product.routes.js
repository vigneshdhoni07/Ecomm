import express from "express"

import ProductController from "./product.controller.js"
import upload from "../../middlewares/fileUpload.middleware.js"
import {auth} from "../../middlewares/jwt.middleware.js"
const productController=new ProductController()

const router=express.Router()

router.get("/",productController.getProducts);
router.post("/",upload.single("imageUrl"),auth,productController.addProduct);
router.get("/filter",productController.filterProduct);
router.post("/rating",auth,productController.rateProduct);
router.get("/:id",productController.getProduct);

export default router;