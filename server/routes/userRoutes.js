const express = require("express")
const {
    singup
}=require("../controllers/userController")

let  userRouter=express.Router()

    userRouter.post("/signup", signup)


module.exports=userRouter