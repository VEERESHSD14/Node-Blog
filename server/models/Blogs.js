const {Schema,model}=require ("mongoose")

const blogSchema=new Schema({

    title:{
        type:String,
        trim:true,
        required:[true,"title is required"]
    },

    snippet:{
        type:String,
        trim:true,
        required:[true,"title is required"]

    },

description:{

    type:String,
        trim:true,
        required:[true,"title is required"]
    
},

author:{
    type:Schema.Types.ObjectId,
        trim:true,
        required:[true,"title is required"]
},

image:{
    type:[String],
    default:""
},
ratings:{
    type:Number,
    required:[true,"rating"],

    default:1,
    min:[1,"please enter above 1"],
    max:[5,"please enter below 5"],

    validator:{
        validate:function(value){
            if(userModel.role !=="user"){
                return value>=1 && value<=5;
            }
            
        },
        message:"rating should be between 1 and 5"
    }
}

})

module.exports=model("blog",blogSchema )