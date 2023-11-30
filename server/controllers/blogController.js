
const Blog = require("../models/Blogs");
const blog = require("../models/Blogs")
const asyncErrorHandler=require("../utils/")


const postBlog=asyncErrorHandler(async(req,res)=>{
    let user = req.user;
    const newBlog = await Blog.create({
      title: req.body.title,
      snippet: req.body.snippet,
      description: req.body.description,
      image: req.body.image,
      author: user._id,
    });
    res.status(201).json({
      status: "success",
      data: {
        newBlog,
      },
    });

})

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      status: "success",
      data: {
        blogs,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getBlog = async (req, res) => {
  try {

       let search=req.query.search|| " "
       let page=req.query.page*1|| 1
       let limit=req.query.limit*1 || 3
       let sort=req.query.sort || "rating"
       let skip=(page-1)*limit
      
       //ratings,year  //ratings year
      sort && sort.split(",").join(" ")
           
    const blog = await Blog.find({title:{$regwx:search,
    $options:"i"}}).skip(skip).limit(limit).sort(sort)
  res.status(200).json({
    status:'success',
    data:{
      blog
    }

  });
    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        updatedBlog,
      },
    })
  }
  if(req.user.role==='user'){
    const updatedBlog=await Blog.findOneAndUpdate({_id:id}),
    {$set:{ratings:ratings}}, {new:true,runValidators:true})
    return res.status(200).json({
      status:'success',
      data:{
        updatedBlog
      }
    })
  }
  catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(404).json({                           
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = {
  postBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};


































































////

//   const Blog = require("../models/Blogs")
//   const postBlog=async(req,res)=>{
//     try{
//         let user=req.user;
//          const newBlog= await Blog.create({ 
//             title:req.body.title,
//             snippet:req.body.snippet,
//             description:req.body.description,
//             image:req.body.image,
//             auther:user._id
        
        
//         })
// res.satus(201).json({
//         status:"success",

//     data:{
//         newBlog
//     }
// })

//     }
//     catch(error) {
//         res.status(400).json({
//             status:'fail',
//             message:TokenExpiredError.message



//         })

//     }

//     const updateBlog=async(req,res)=>{
//         try{
//             const {id}=req.params
//             const updateBlog=await Blog update({

//             })
            
//         }
//     }
// }

//  module.exports= {postBlog };

 ////