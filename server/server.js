require("dotenv").config();
const http=require("http")
const app = require("./app")
const PORT=process.env.PORT
const mongoose=require("mongoose");
const { connected } = require("process");
const MONGOLOCAL_URL=process.env.MONGOLOCAL_URL

const server= http.createServer(app)

mongoose.connect(MONGOLOCAL_URL).then(()=>{
    console.log("db connected");
}).catch((err)=>{
    console.log(err);
})

server.listen(PORT,(err)=>{
    if(err)console.log(err);
    console.log(`listening on ${PORT}.....`);
})
