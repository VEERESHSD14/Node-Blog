const router=require("express").Router()
const auth=require("../middlewares/authMiddleware")
// let BlogRoutes= express.Router()
const { postBlog,getBlog, updateBlog, deleteBlog}=require("../controllers/blogController")



// // router.get("/Blog",(req, res)=>{
//     router.get("/", auth,(req, res)=>{
  

//         let user=req.user
//         res.send('Welcome ${user.name}')
//     res.send("hello")

// })



router.post("/",auth,verifyRole(["author",]),postBlog)
router.get("/",auth,getBlog)
router.get("/:id",auth,getBlog)
// router.get("/",auth,getByAuthor)
router.patch("/:id",auth,verifyRole(["author"]),updateBlog)
router.patch("/ratings/:id",auth, verifyRole(["user"]), updateBlog)
router.delete("/:id",auth,verifyRole(["admin","author"]), deleteBlog)







module.exports=router; 