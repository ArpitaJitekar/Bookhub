import {React,useEffect,useState,useRef} from 'react'
import  '../App.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Userprofile = () => {
  const userprofile=JSON.parse(localStorage.getItem("profile"))
  const navigate=useNavigate()
  let user=JSON.parse(localStorage.getItem("user"))
  let  userId=user._id
  const [profile,setprofile]=useState([])
  const [username,setusername]=useState("")
  const [emailId,setemailId]=useState("")
  const [userbio,setuserbio]=useState("")
  const [genres,setgenres]=useState("")
  const [wish,setwish]=useState("")
  const [image,setimage]=useState([])
  const images = require.context('../profiles', false, /\.(png|jpe?g|svg|webp)$/)
//name=userdata.name //email=userdata.email
//isloggedin=localstorage.getItem("isloggedin")
//if isoggedin is true don't show log in page again else show it

// function for getting image from backend

//function for fetching information of user from backend
const update=(e)=>{
  e.preventDefault();
navigate('/update',{state:profile})
}
const fetchinfo=async()=>{
 
  const result=await axios.get("http://localhost:5000/profile");
  console.log("this is result from get api",result.data.data)
  setprofile(result.data.data)
  setimage(result.data.data.image)
 
 

  localStorage.setItem("info",JSON.stringify({username,userbio,emailId,wish,genres}))
}
useEffect(()=>{
  fetchinfo()
},[])


  console.log(profile)
  return (
     
    <div className="profile-page">
      
    
      <div className="header">
      <h5 className='comp'>Name:{profile.username}</h5>
      <h6 className='comp'>Bio:{profile.userbio}</h6>
      <h6 className='comp'>Favourite Genre:{profile.genres}</h6>
      <h6 className='comp'>Book wishlist:{profile.wish}</h6>
       {/* <img src={images(`${image}`)} alt={profile.username} height={200} width={200}/>  */}
      
     <button className="btn btn-success" onClick={update}>Update</button>
     
     </div> 


</div>
   
  )
}

export default Userprofile