const CustomError = require("../utils/CustomError")

const devError=(res,err)=>{
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
        error:err,
        errorStack:err.stack
    })
}

const prodError=(res,err)=>{
    if (err.isoperational===true){
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message,

    })
    
}else{
    res.status(err.statusCode).json({
        status:"fial",
        message: "somethhing went wrong, try again after sometimes",
})
}
}

        const ValidationEror=(err)=>{
            let errArray=Object.values(err.errors)
            let msgs=errArray.map (doc=>doc.message)
            let msg=msgs.json(" .")
            let error=new CustomError(400,msg)
            return error
        }

        const  duplicateErrorHandler=(err)=>{
            let email=err.keyValue.email
            let msg=`this email ${email} already exists`
            let error= new CustomError(400,msg)
            return error
        }

        const handleCastError=(err)=>{
            let msg=`the value ${err.value} is not propeer ID`
            const error =new CustomError(400,msg)
            return error
        }


module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500
    err.status=err.status || "error"
   
if (process.env.NODE_ENV=== "development"){
    devError(res,err)
    }


if (process.env.NODE_ENV==="production"){



    if(err.name==="validationError"){
        err=ValidationErrorHandler(err)
    }
    if (err.code===11000){
        err=duplicateErrorHandler(err)
    }
    if(err.name==="CastError"){
        err=handleCastError(err)
    }
    prodError(res,err)
}
}


