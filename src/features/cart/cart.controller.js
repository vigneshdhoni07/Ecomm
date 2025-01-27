import CartModel from "./cart.model.js"
export const addCart = (req, res) => {
    let { productId, quantity } = req.query
    let { userId } = req
    try {
        let cart = CartModel.addCart(userId, productId, quantity)
        res.status(200).json(cart)
    } catch (error) {
        res.status(400).json({ message: new Error(error).message })
    }
}
export const getUserCart=(req,res)=>{
    let {userId}=req
    let cart=CartModel.getAllCart(userId)
    if(cart.length)
    {
        return res.status(200).json({cart})
    }
    return res.status(404).json({message:"Cart not found"})
}
export const deleteCart=(req,res)=>{
    let {userId}=req
    let {cartId}=req.query
    try {
        let cart=CartModel.deleteCart(userId,cartId)
        res.status(200).json({message:"Cart deleted successfully"})
    } catch (error) {
        res.status(400).json({message:new Error(error).message})
    }

}