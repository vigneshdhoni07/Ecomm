import UserModel from "../features/user/user.model.js"


export default function auth(req,res,next){
let creds=req.headers["authorization"]
if(!creds){
    return res.status(400).json({message:"Credentials not found"})
}
let base64Creds=creds.replace("Basic","")
let decodedCreds=Buffer.from(base64Creds,"base64").toString("utf8");
let [email,password]=decodedCreds.split(":")
let user=UserModel.SignIn(email,password)
if(user){
    next()
}
else{
    return res.status(400).json({message:"Invalid Credentials"})
}
}