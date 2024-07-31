import {React,useState,useRef} from 'react'
import { FaUser } from 'react-icons/fa'

const Edituserprofile = () => {
    const[imgs,setimg]=useState("")
    const fileInputRef = useRef(null);
    const [profile,setprofile]=useState([])
    const [username,setusername]=useState("")
    const [emailId,setemailId]=useState("")
    const [userbio,setuserbio]=useState("")
    const [genres,setgenres]=useState("")
    const [wish,setwish]=useState("")
    let user=JSON.parse(localStorage.getItem("user"))
    let  userId=user._id
    const handleClick=(e)=>{
        e.preventDefault()
        fileInputRef.current.click()
      }

    

        const updateinfo=async()=>{
          localStorage.removeItem("profile")
          const data=new FormData()
          data.append("name")
          let res=await fetch("http://localhost:5000/profile",{
            method:'put',
            body:data
          })
          
          res=await res.json()
         
          setprofile(res)
      }



    const image=async(file)=>{
        const reader=new FileReader()
       reader.readAsDataURL(file)
       const Data=new Promise((res,rej)=>{
        reader.onload=()=>{res(reader.result)}
        reader.onerror=(err)=>rej(err)
       })
       return Data
      
      }

    const handleUpload=async(e)=>{
        console.log("handleupload is working")
        // const file=e.target.files[0]
        // console.log("everything is ok with file",file)
        // const img=await image(file)
        setimg(e.target.files[0])
      }
      

       const submit=async(e)=>{
        e.preventDefault();
       
        try{
          const formData = new FormData();
          formData.append("username", username);
          formData.append("emailId", emailId);
          formData.append("userbio", userbio);
          formData.append("image",imgs) 
          formData.append("genres", genres);
          formData.append("wish", wish);
          formData.append("userId", userId);
          let res=await fetch("http://localhost:5000/setprofile",{
          method:'post',
          body:formData,

        })
       
         localStorage.setItem("profile",JSON.stringify({username,emailId,userbio,genres,wish}))
        
       if(res.status==="ok"){
          setemailId("")
          setgenres("")
          setwish("")
          setusername("")
          setuserbio("")
          setimg("")
        }}catch(err){
          console.log("error",err)
        }
        window.location.href='/profile'
      }
  return (
    <form  encType="multipart/form-data" onSubmit={submit}>
    <div className="profile-div">
      <div className="img-cont">
   
   <label htmlFor='uploadImage'></label>
   <div className="uploadbox">
   {imgs?<img src={imgs}className="image-upload-box" alt="not able to display "/>:<> <input type="file" className="custom-file-input " accept="image/*" onChange={handleUpload} id="customFile"/></>}
  
  {/* {imgs?<img src={imgs}className="image-upload-box" alt="not able to display "/>:<><input type="file" name="image"id="uploadImage" ref={fileInputRef} onChange={handleUpload}/><button onClick={handleClick}><FaUser htmlFor="file-input"/></button></>} */}
   </div>

</div>     

 {/* <img src={imag[0].image} alt="not able to display " height={200}  width={200} /> */}
<div className="user-info">

<div className="form-group my-3 mx-3">
<label htmlFor="Title">UserName</label>
<input type="text" value={username} onChange={(e)=>{setusername(e.target.value)}} className="form-control" id="title" aria-describedby="emailHelp"/>
</div>

<div className="form-group my-3 mx-3">
<label htmlFor="email">Email</label>
<input type="text"defaultValue={emailId}  className="form-control" id="email" aria-describedby="emailHelp" disabled/>
</div>
<div className="form-group my-3 mx-3">
<label htmlFor="bio">Bio</label>
<input type="text" value={userbio} onChange={(e)=>{setuserbio(e.target.value)}} className="form-control" id="bio" aria-describedby="emailHelp"/>
</div>

<div className="form-group my-3 mx-3">
<label htmlFor="genre">Favourite Genres</label>
<input type="text" value={genres} onChange={(e)=>{setgenres(e.target.value)}} className="form-control" id="genre" />
</div>

<div className="form-group my-3 mx-3">
<label htmlFor="bookwishlist">Book Wishlist</label>
<input type="text" value={wish} onChange={(e)=>{setwish(e.target.value)}} className="form-control" id="bookwishlist" />
</div>
<button type="submit" className="btn btn-sm btn-danger mx-3 my-3">Submit</button>


</div>
    </div>
    </form>
  )
}

export default Edituserprofile

