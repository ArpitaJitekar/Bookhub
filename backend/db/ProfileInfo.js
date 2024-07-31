const Mongoose =require('mongoose')
const profileSchema=new Mongoose.Schema({
    username:String,
    emailId:{type:String,unique:true},
    userbio:String,
    genres:String,
    wish:String,
    image:String,
    userId:String,
   

})
module.exports=Mongoose.model('profiles',profileSchema)