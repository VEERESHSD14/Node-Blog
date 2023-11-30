// const express=require("express");
// const authRoutes=require("./routes/userRoutes")
// const userRouter = require("./routes/userRoutes");

// const app=express()
// app.use(express.json ())
// app.use("/app/v1/users",authRoutes);
// app.use("/app/v1/profile",profileRoutes)

// module.exports=app;


const express=require("express")
// const authRoutes=require("./routes/userRoutes")

const BlogRoutes=require("./routes/BlogRoutes")
const userRouter = require("./routes/userRoutes")
const CustomError = require("./utils/CustomError")
const globalErrorController = require("./controllers/globalErrorController")

const app=express(userRouter)

app.use(express.json())
// app.use("/app/v1/users",authRoutes);
app.use("/app/v1/user",userRouter);


app.use("/app/v1/Blog",BlogRoutes);

app.all("*",(req,res)=>{
    // res.status(404).json({status:"fail",
    // message:"page not found"

        // let err=new Error("page not found")
        // err.status="fail"
        // next(err)
        let err=new CustomError(404,"page not found")
        next(err)

})

//global error handler
app.use(globalErrorController)



module.exports=app;