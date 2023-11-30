const {
    Schema,
    model
}=require("mongoose")

const validator=require("validator")
const bcrypt=require("bcryptjs")

let userSchema =new Schema({
    name:{
        type:String,
        required:[true,"name feild cant be empty"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"email feild cant be empty"],
        lowercase:true,
        trim:true,
        unique:true,
        validate:[validator.isEmail,"enter valid email"]
    },
    password:{
        type:String,
        required:[true,"password feild cant be empty"],
        minlength:[8, "password should contain above 8 characters"]

    },
    confirm_password:{
        type:String,
        required:[true,"password feild cant be empty"],
        minlength:[8, "confirm password should contain above 8 characters"],
        //custom validation
        validate: function(value) {

            return this.password === value
        },
        message:"password and confirm password does not match.."

    },
    role:{
        type:String,
        enum:["user", "admin", "author"],
        default:"admin"
    }
}, {
    timestamps:true
})

userSchema.pre("save",async function(next){
    this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.methodscomparePassword=function(pwdDB){
    return await =bcrypt.compare (pwd,pwdDB)
}


//pre save hook
//userSchema.pre("save",function(){
//    return this.password === this.confirm_password
//})

module.exports=model("user",userSchema);