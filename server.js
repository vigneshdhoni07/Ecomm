import express from "express"
import swagger from "swagger-ui-express"
import assert from 'node:assert';
import fs from 'fs'

import * as productRoutes from "./src/features/product/product.routes.js"
import * as userRoutes from "./src/features/user/user.routes.js"
import * as cartRoutes from "./src/features/cart/cart.routes.js"
import basicAuthMiddleware from "./src/middlewares/basicAuth.middleware.js"
import { auth } from "./src/middlewares/jwt.middleware.js"
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";

let apiDocs = JSON.parse(fs.readFileSync("./swagger.json", { encoding: null }).toString("utf8"))

// import apiDocs from './swagger.json' assert { type: 'json' };

// console.log(apiDocs);


const server = express()
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(loggerMiddleware)
server.use('/api-docs', swagger.serve, swagger.setup(apiDocs))
server.get("/", (req, res) => { res.send("<h2>Welcome to Ecomm Project</h2>") })
server.use("/api/product", productRoutes.default)
server.use("/api/auth", userRoutes.default)
server.use("/api/cart", cartRoutes.default)
server.use((err,req,res,next)=>{
    // console.log(err)
    if(err instanceof ApplicationError){
       return res.status(err.code).send(err.message)
    }
    return res.status(500).send("something went wrong")
})
server.use((req,res)=>{
    res.status(404).send("<h2>Url not found!</h2>")
})
server.listen(3200, () => { console.log("server running at 3200") })