const Mongoose =require('mongoose')
const bookSchema=new Mongoose.Schema({
   
    image:String,
   
    
})
module.exports=Mongoose.model('books',bookSchema)