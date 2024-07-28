import {React,useEffect,useState,useRef} from 'react'
import  '../App.css'
import  '../profile.css'



const Userprofile = () => {
  const userprofile=JSON.parse(localStorage.getItem("profile"))
 
  let user=JSON.parse(localStorage.getItem("user"))
  let  userId=user._id
  const[imgs,setimg]=useState("")
  const[imag,setimag]=useState([])
  // const [name,setname]=useState([])
  // const [email,setemail]=useState([])
  // const [bio,setbio]=useState([])
  // const [genre,setgenre]=useState([])
  // const [bookwish,setbookwish]=useState([])
  const [profile,setprofile]=useState([])
  const [username,setusername]=useState("")
  const [emailId,setemailId]=useState("")
  const [userbio,setuserbio]=useState("")
  const [genres,setgenres]=useState("")
  const [wish,setwish]=useState("")
  const [showform,setshowform]=useState(true)







// function for getting image from backend

//function for fetching information of user from backend

const fetchinfo=async()=>{
 
  let res=await fetch("http://localhost:5000/profile")
  
  res=await res.json()
 
  setprofile(res)
console.log("get api",res)
 
 

  localStorage.setItem("info",JSON.stringify({username,userbio,emailId,wish,genres}))
}
useEffect(()=>{
  fetchinfo()
},[])


  console.log(profile)
  return (
     
    <div className="profile-page">
      
    
      <div className="header">
      <h5 className='comp'>Name:{userprofile.username}</h5>
      <h6 className='comp'>Email:{userprofile.emailId}</h6>
      <h6 className='comp'>Bio:{userprofile.userbio}</h6>
      <h6 className='comp'>Favourite Genre:{userprofile.genres}</h6>
      <h6 className='comp'>Book wishlist:{userprofile.wish}</h6>
      {/* {imag.map((e)=>{
        return  <img src={e[0].image} alt="not able to display " height={200}  width={200} /> 
      })}
      <img src={imag} alt="not able to display " height={200}  width={200} />  */}
      {/* { (profile.image).map((e)=>{
       return <img src={e.image} alt="not able to display " height={200}  width={200} />
      })} */}
     
     </div> 


</div>
   
  )
}

export default Userprofile