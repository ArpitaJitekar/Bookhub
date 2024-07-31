import {React,useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom'

const Profileupdate = () => {
    const [username,setusername]=useState("")
    const [emailId,setemailId]=useState("")
    const[imgs,setimg]=useState("")
    const [userbio,setuserbio]=useState("")
    const [genres,setgenres]=useState("")
    const [wish,setwish]=useState("")
   const location=useLocation()
   useEffect(()=>{
    console.log(location)
    setusername(location.state.username)
    setuserbio(location.state.userbio)
    setgenres(location.state.genres)
    setwish(location.state.wish)
   })
    
    const submit=async()=>{
        console.log("its working")
        const formData = new FormData();
          formData.append("username", location.state.username);
          formData.append("id", location.state._id);
          formData.append("userbio", userbio);
          formData.append("image",location.state.image); 
          formData.append("genres", genres);


        console.log("this is new name",username)
        let res=await fetch("http://localhost:5000/update",{
            method:'post',
            body:formData
            // body:JSON.stringify({
            //     id:location.state._id,
            //     username:username,
            //     userbio:userbio,
            //     wish:wish,
               // imgs:location.state.image
            // }),
    })
res=res.json()
    console.log("This is updated info",res)
 window.location.href='/profile'
}
    const handleUpload=async(e)=>{
        setimg(e.target.files[0])
      }
      
  return (
    <div>
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
<input type="text" dafaultvalue={username} onChange={(e)=>{setusername(e.target.value)}} className="form-control" id="title" aria-describedby="emailHelp"/>
</div>

<div className="form-group my-3 mx-3">
<label htmlFor="email">Email</label>
<input type="text"Value={emailId}  className="form-control" id="email" aria-describedby="emailHelp"/>
</div>
<div className="form-group my-3 mx-3">
<label htmlFor="bio">Bio</label>
<input type="text" dafaultvalue={userbio} onChange={(e)=>{setuserbio(e.target.value)}} className="form-control" id="bio" aria-describedby="emailHelp"/>
</div>

<div className="form-group my-3 mx-3">
<label htmlFor="genre">Favourite Genres</label>
<input type="text" defaultvalue={genres} onChange={(e)=>{setgenres(e.target.value)}} className="form-control" id="genre" />
</div>

<div className="form-group my-3 mx-3">
<label htmlFor="bookwishlist">Book Wishlist</label>
<input type="text" defaultvalue={wish} onChange={(e)=>{setwish(e.target.value)}} className="form-control" id="bookwishlist" />
</div>
<button type="submit" className="btn btn-sm btn-success mx-3 my-3">Submit</button>


</div>
    </div>
    </form>
    </div>
  )
}

export default Profileupdate
