const Mongoose =require('mongoose')
const userSchema=new Mongoose.Schema({
    name:String,
    email:String,
    password:String
})
module.exports=Mongoose.model('users',userSchema)