import ProductModel from "./product.model.js"
export default class ProductController{
    getProducts(req,res){
        const products=ProductModel.allProducts
        res.status(200).json(products)
    }
    addProduct(req,res){
        const product=req.body;
        product.size=product.size.split(",")
        // console.log(req.file)
        product.imageUrl=req.file.filename
        console.log({product})
        ProductModel.allProducts=product
        res.status(201).json(product)
    }
    getProduct(req,res){
        // try {
        //     let id=req.params.id
        //     let product=ProductModel.getProduct(id)
       
        //         res.status(200).json(product)
        // } catch (error) {
        //     res.status(500).send(error.message)
        // }
        let id=req.params.id
        let product=ProductModel.getProduct(id)
   
            res.status(200).json(product)
        

    }
    filterProduct(req,res){
        let {maxPrice,minPrice,category}=req.query
        let product=ProductModel.filterProduct(maxPrice,minPrice,category)
        if(product.length){
            res.status(200).json(product)
        }
        else{
            res.status(404).json({message:"Product not found"})
        }
    }
    rateProduct(req,res){
        try {
            let {userId,productId,rating}=req.query
            ProductModel.rateProduct(userId,productId,rating)
            res.status(200).json({message:"product rated successfully"})
        } catch (error) {
            // res.status(400).json({message:new Error(error).message})
            next(error)
        }
    }
}
