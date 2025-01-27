import {Router} from "express";
import { addCart,getUserCart,deleteCart } from "./cart.controller.js";
import { auth } from "../../middlewares/jwt.middleware.js";
let router=Router()
router.route("/").post(auth,addCart)
router.route("/").get(auth,getUserCart)
router.route("/").delete(auth,deleteCart)


export default router