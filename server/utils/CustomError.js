class CustomError extends Error{
    constructor(statusCode,message){
        super(message)
        this.statusCode=statusCode;
        this.status=statusCode>=400 && statusCode <=500 ?"fail":"error"
            //StackTrace is used to find or define where the error exactly comes from,below line
        Error.captureStackTrace(this,this.constructor)
    }
}
module.exports=CustomError;