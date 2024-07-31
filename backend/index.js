const express=require('express')
const cors=require('cors')
const path=require('path')
require('./db/cofig')
const User=require('./db/User')
const Book=require('./db/Book')

const profileInfo=require('./db/ProfileInfo')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const jwt_secret="egdytvwi7263{]222ft2vn874cyt3yg494825"
const app=express()

const multer=require('multer')
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'../frontend/bookverse/src/profiles/');
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname)
    }
})

const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/bookverse/src/images/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix+ file.originalname  )
    }
  })
  
  const upload = multer({ storage: storage1 })

const profileupload=multer({storage:storage})

app.use(express.json({limit:"10mb"}))

app.use(cors())



app.post('/signup',async(req,resp)=>{
    const{name,email,password}=req.body
    const existinguser=await User.findOne({email})
    const encryptedpassword=await bcrypt.hash(password,10)
    if(existinguser){
       return resp.send({error:"user exists"})
    }
    try{
        await User.create({
            name,email,
            password:encryptedpassword,
        })
        resp.send({status:"ok"})
    } catch(err){
        resp.send({status:err})
    }
  
})
//here password is removed 
app.post('/login',async(req,resp)=>{
   const {email,password}=req.body
   const user=await User.findOne({email})
   if(!user){
    return resp.send({error:"user not found"})
   }
   if(await bcrypt.compare(password,user.password)){
    const token=jwt.sign({email:user.email},jwt_secret)
    if(resp.status(201)){
        return resp.json({status:"ok",data:token})
    }else{
       return  resp.json({status:"error"})
    }}else{
        resp.json({status:"error",message:"Invalid password"})
    
   }
    
})

//api for saving profile onfo from form into database
app.post('/setprofile',profileupload.single('image'),async(req,resp)=>{
    console.log("This is my request",req.body,req.file.filename);
    const imagename=req.file.filename
   

    try {
        await profileInfo.create({username:req.body.username,
            emailId:req.body.emailId,
            userbio:req.body.userbio,
            image:imagename,
            genres:req.body.genres,
            wish:req.body.wish,
            userId:req.body.id})
        resp.json({status:"ok"})
    } catch (error) {
        resp.json({status:error})
    }
})

//api to sen profile info on profile page
app.get('/profile',async(req,resp)=>{
    try {
        const data=await profileInfo.findOne()
        resp.send({ status: "ok", data:data })
        
    } catch (error) {
        resp.json({status:error})
    }
   


})
app.post('/update',profileupload.single("image"),async(req,resp)=>{
   const {id,username,userbio,genres,wish,image}=req.body
   try {
    const res=await profileInfo.updateOne({_id:id},{
        $set:{
            username:username,
            userbio:userbio,
            genres:genres,
            wish:wish,
            image:image,  
        }
    })
    return resp.json({status:"ok",data:res})
   } catch (error) {
    return resp.json({status:"error",data:error})
   }
})

app.post('/addBook',upload.single("image"),async(req,resp)=>{
    console.log("This is my request",req.body,req.file.filename);
    const imagename=req.file.filename
    try {
        await Book.create({image:imagename})
        resp.json({status:"ok"})
    } catch (error) {
        resp.json({status:error})
    }
})
app.get('/image',async(req,resp)=>{
    try {
        const data=await Book.find({})
        resp.send({ status: "ok", data:data })
        
    } catch (error) {
        resp.json({status:error})
    }
  
   
    })
app.listen(5000)