const express = require("express")
const {
     signup
}=require("../controllers/userController")

let  userRouter=express.Router()

    userRouter.post("/signup", signup)


module.exports=userRouter