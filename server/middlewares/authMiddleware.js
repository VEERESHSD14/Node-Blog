
const jwt = require("jsonwebtoken");
const User= require("../models/user");
const asyncErrorHandler=require("../utils/asyncErrorHandler")
const CustomError=require("../utils/CustomError")



const auth= asyncErrorHandler(async(req,res,next)=>{
    try{

        let testToken=req.headers.authorization
       let token;
       if(testTokenoken &&  testToken.startswith("Bearer")){
        token=testToken.split(" ")[1]
       }
       if(!token){
        const err = new CustomError(401,"try logging in, to access");
        next(err);

       }
       console.log(token);
        if(!token){
            return res.status(401).json({
                stauts:'fail',
                message:'Try logging in, to  access'

            })
        }
            const decodedToken= await jwt.verify(token,process.env.JWT_SECRET)
            const user= await User.findById(decodedToken.id);
            if(!user){
                const err = new CustomError(401,"user no longer exists");
                
            }
            req.user=user;

        next()



    } catch(error){
        res.status(401).json({
            status:'fail',
            message:error.message
        })

    }
}
module.exports=auth;