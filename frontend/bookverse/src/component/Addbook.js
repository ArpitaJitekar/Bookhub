import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
const Addbook = ({addBook}) => {
  const  [title,settitle]=useState('');
    const [author,setauthor]=useState('');
    const[genre,setgenre]=useState('')
    const  [desc,setdesc]=useState('');
    const [file,setFile]=useState();
    const [isFirstFunctionCalled, setIsFirstFunctionCalled] = useState(false)
    const navigate=useNavigate()

   const postimage=async()=>{
    let res=await fetch("http://localhost:5000/addBook",{
    method:'post',
    body:JSON.stringify({bookinfo:file}),
    headers:{
     "content-Type":"application/json"
    }
   })
   res=await res.json()
   console.log(res)
   }
   const fetchimg=async()=>{
 
    let res=await fetch("http://localhost:5000/")
    
    res=await res.json()
   console.log("fetimg working properly")
    setFile(res)
  
  }
  useEffect(()=>{
fetchimg()
  },[])
  

   
   
    
  





    
    // const handle=fetch("lcalhost://")
    const submit=(e)=>{
     e.preventDefault();
    if(!title || !desc || !genre|| !author ){
        alert("title or description cannot be blank")
    }
    else{
    addBook(desc,title,author,genre,file)
   postimage()
        settitle("")
        setdesc("")
        setauthor("")
        setgenre("")
        setFile()
} 
if(true){
  navigate('/')
}

} 




  return (

    <div>
       <form onSubmit={submit}> 
    <h1 className="mx-3">Add to List </h1>
  <div className="form-group my-3 mx-3">
    <label htmlFor="Title">Book Title</label>
    <input type="text" value={title} onChange={(e)=>{settitle(e.target.value)}} className="form-control" id="title" aria-describedby="emailHelp"/>
  </div>
  {/*need to add image in main page*/ }
  <form method="post" action="/" >
  <div className="custom-file mx-3 ">
  <input type="file" className="custom-file-input "  onChange={(e)=>{setFile(URL.createObjectURL(e.target.files[0]))}} id="customFile"/>
  <label className="custom-file-label" for="customFile">Choose Image</label>
</div>

<div>
    <input type="submit" value="Upload" />
    </div>
</form>
  {/* <div className="form-group my-3 mx-3">
    <label htmlFor="Title">Book Title</label>
    <input type="text"  value={title} onChange={(e)=>{settitle(e.target.value)}}className="form-control" id="title" aria-describedby="emailHelp"/>
  </div> */}
  <div className="form-group mx-3">
    <label htmlFor="desc">Author</label>
    <input type="text"  value={author} onChange={(e)=>{setauthor(e.target.value)}} className="form-control" id="author"/>
  </div>
  <div className="form-group mx-3">
    <label htmlFor="desc">Genre</label>
    <input type="text" value={genre} onChange={(e)=>{setgenre(e.target.value)}}  className="form-control " id="genre"/>
  </div>
  <div className="form-group mx-3">
    <label htmlFor="desc">Book Description</label>
    <input type="text"  value={desc} onChange={(e)=>{setdesc(e.target.value)}} className="form-control" id="desc"/>
  </div>
 
  <button type="submit" className="btn btn-sm btn-success mx-3 my-3">Add</button>
</form>


    </div>
  )
}

export default Addbook
