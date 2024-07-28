const express=require('express')
const cors=require('cors')
const path=require('path')
require('./db/cofig')
const User=require('./db/User')
const Book=require('./db/Book')
const profileImage=require('./db/Profile image')
const profileInfo=require('./db/ProfileInfo')

const app=express()

const multer=require('multer')
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./profile/');
    },
    filename:function(req,file,cb){
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const profileupload=multer({storage:storage})
app.use(express.json({limit:"10mb"}))
app.use(cors())
// app.use('/profile',express.static('profile'))


app.post('/signup',async(req,resp)=>{
    const user=new User(req.body)
    let result=await user.save()
    result=result.toObject()
    delete result.password
    resp.send(result)
})
//here password is removed 
app.post('/login',async(req,resp)=>{
    if(req.body.password && req.body.email){
    
    const user=await User.findOne(req.body).select("-password")
       user?resp.send(user):resp.send("no user found")
    }
    else{
        resp.send("please enter both fields")
    }
})
// app.post('/addBook',addBook.single("file"),async(req,resp)=>{
//     let book=new Book(req.body)
//     req.body.images.push("file")
//     let result=await book.save()
//     resp.send(result)
// })
app.post('/setprofile',profileupload.single('image'),async(req,resp)=>{
   
    let info=new profileInfo( 
    {
        username:req.body.username,
        emailId:req.body.emailId,
        userbio:req.body.userbio,
        // image:req.file.filename,
        genres:req.body.genres,
        wish:req.body.wish,
        userId:req.body.userId
        
})
     
     info=await info.save()
    resp.send({info})
})


app.get('/profile',async(req,resp)=>{
const profile=await profileInfo.findOne()
const formattedProfile = {
    image: profile.image,
    username: profile.username,
    emailId: profile.emailId,
    wish: profile.wish,
     genres: profile.genres,
    uerbio: profile.userbio
  }
resp.json(formattedProfile)

})
app.put('/setprofile',async(req,resp)=>{
    let data=await profileInfo.updateOne(req.params,
        {$set:req.body})
    resp.send(data)
})

app.post('/addBook',async(req,resp)=>{
    console.log(req.body);
    let book=new Book( req.body )
     book=await book.save()
    resp.send(book)
})
app.get('/',async(req,resp)=>{
    const bookinfo=await Book.find({})
    resp.json({bookinfo:bookinfo})
    })
app.listen(5000)