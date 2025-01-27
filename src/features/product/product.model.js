import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "../user/user.model.js";

export default class ProductModel{
    constructor(id,name,desc,price,imageUrl,category,size){
        this.id=id,
        this.name=name,
        this.desc=desc,
        this.price=price,
        this.imageUrl=imageUrl,
        this.category=category,
        this.size=size
    }
    static get allProducts(){
        return products;
    }
    static set allProducts(product){
         products.push(product);
         return products;
    }
    static getProduct(id){
        let product=products.find((pro)=>pro.id==id)
        if(!product){
            throw new ApplicationError("Product not found",404)
        }
        return product
    }
    static filterProduct(maxPrice,minPrice,category){
        return products.filter((pro)=>{
            return ( (!minPrice || pro.price>=minPrice) && (!maxPrice || pro.price<=maxPrice) && (!category || pro.category==category))
        })
    }
    static rateProduct(userId,productId,rating){
        let user=UserModel.getUser(userId)
        if(!user){
            throw new ApplicationError("user not found!",400)
        }
        let product=this.getProduct(productId)
        if(!product){
            throw new ApplicationError("product not found!",400)
        }
        if(!product.rating){
            product.rating=[{userId,rating}]
        }
        else{
            let existingRating=product.rating.findIndex((pro)=>pro.userId==userId)
            if(existingRating>=0){
                product.rating[existingRating]={userId,rating}
            }
            else{
                product.rating.push({userId,rating})
            }
        }
    }
}

var products=[
    new ProductModel(1,"bat","cricket bat",500,"http://www.bat.com","sports",['L','XL','M']),
    new ProductModel(2,"phone","mobile phone",200,"http://www.phone.com","electronics",['L','XL']),
    new ProductModel(3,"shirt","t shirt",300,"http://www.shirt.com","cloths",['L','XL','XXL']),
    new ProductModel(4,"pant","pant",400,"http://www.shirt.com","cloths",['L','XL','XXL']),
    new ProductModel(5,"jeans","pant",350,"http://www.shirt.com","cloths",['L','XL','XXL']),



]