const userModel=require("../models/userModel")

const signup=async (req,res)=>{
    const {name, email,password,confirmPassword}=req.body
try{
    //verify if user is present already
    const existingUser=await findOne({email:req.body.email})
    if(existingUser){
        return res.status(401).json({
            status:'fail',
            message: "user exists altready, try logging in "
        })
    }
    const newUser=await UserActivation.create(req.body)
    res.status (201).json({
        status:'success',
        data:{
            newUser
        }
    })


}catch (error){
    res.status(400).json({
        status:'fail',
        message:error.message
    })

}
}
