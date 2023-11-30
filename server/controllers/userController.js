const User=require("../models/user")
const jwt=require("jsonwebtoken")
const asyncErrorHandler=require("../utils/asyncErrorHandler")
const CustomError=require("../utils/CustomError")


const genToken=async (id)=>{
   return await jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:24*60*60
    })
}
const signup= asyncErrorHandler(async (req,res,next)=>{
    try {
        // //verify if user is present already
        // const existingUser=await User.findOne({email:req.body.email})
        // if(existingUser){
            // return res.status(401).json({
            //     status:'fail',
            //     message:"user exists already,try logging in"
            // })

                // const err=new CustomError(401."user exists already, try logging in ")
                // next( err);

        }
        const newUser=await User.create(req.body)
        const token=await genToken(newUser._id)
        res.status(201).json({
            status:'success',
            token,
            data:{
                newUser
            }
        
    
        })
//     } catch (error) {
//         res.status(400).json({
//             status:'fail',
//             message:error.message
//         })
    }
    
     })

const login=async (req,res)=>{
    try {
        if(!req.body.email || !req.body.password ){
            return res.status(400).json({
                status:'fail',
                message:"please enter credentials"
            })
        }
        const existingUser=await User.findOne({email:req.body.email})
        if(!existingUser || !(await existingUser.comparePassword(req.body.password,existingUser.password))){
            // return res.status(400).json({
            //     status:'fail',
            //     message:"User name and password is not correct"
            // })
        }
        const token=await genToken(existingUser._id)
        res.status(200).json({
            status:"success",
            token,
            data:{
                existingUser
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}

module.exports={
    signup,login
}