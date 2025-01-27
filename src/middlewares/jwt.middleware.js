import jwt from "jsonwebtoken";

export const auth=(req,res,next)=>{
    const token=((req.headers["authorization"])?.replace("Bearer ",""))
    // console.log({token})
    if(!token){
        return res.status(401).json({message:"Unauthorised"})
    }
    try {
        let payload=jwt.verify(token,"vignesh")
        console.log({payload})
        req.userId=payload.id
    } catch (error) {
        return res.status(401).json({message:"Invalid Credentials"})
    }
    next()
}