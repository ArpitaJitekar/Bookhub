const Mongoose =require('mongoose')
const imgSchema=new Mongoose.Schema({
   image:String
    
})
module.exports=Mongoose.model('profile image',imgSchema)