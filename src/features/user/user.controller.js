import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
export default class UserController{
    signUp(req,res){
        let {name,email,password,type}=req.body
        console.log({name,email,password,type})
        let user=UserModel.SignUp(name,email,password,type)
        res.status(201).send(user)
    }
    signIn(req,res){
        let {email,password}=req.body
        let user=UserModel.SignIn(email,password)
        if(user){
            
            let token=jwt.sign({id:user.id,email:user.email},"vignesh",{expiresIn:"24h"})
            res.status(200).json({token})
        }
        else{
            res.status(400).json({message:"Authenticaion Failed"})
        }
    }
    users(req,res){
        return res.status(200).json({users:UserModel.getUsers()})
    }
}