export default class CartModel{
    constructor(id,userId,productId,quantity){
        this.id=id,
        this.userId=userId,
        this.productId=productId,
        this.quantity=quantity
    }
    static addCart(userId,productId,quantity){
        let id=cart.length+1
        let newCart=new CartModel(id,userId,productId,quantity)
        cart.push(newCart)
        return newCart
    }
    static getAllCart(userId){
            let allCarts=cart.filter((crt)=>crt.userId==userId)
            return allCarts
    }
    static deleteCart(userId,cartId){
        let cartIndex=cart.findIndex((crt)=>crt.id==cartId&&crt.userId==userId)
        if(cartIndex<0){
            throw new Error("cart not found")
        }
        cart.splice(cartIndex,1)
    }
}

const cart=[{id:1,userId:1,productId:1,quantity:2}]