import React ,{useState,useEffect}from'react'
import { useNavigate } from 'react-router-dom'

const SignUp=()=>{
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()
    //if user is signed up it won't allow them to sign up again
    useEffect(()=>{
        const auth=localStorage.getItem("user")
        if(auth){
            navigate('/')
        }
    })
    //for sending datato backend by clicking mouse
    const collectData=async()=>{
    console.log(name,password,email)
    let result=await fetch('http://localhost:5000/signup',{
        method:'post',
        body:JSON.stringify({name,password,email}),
        headers:{
            'Content-Type':'application/json'
        }
    })
    result=await result.json()
    console.log(result)
    setName('')
    setEmail('')
    setPassword('')
    localStorage.setItem('user',JSON.stringify(result))
    if(result){
        navigate('/')
    }
    }
    return(
        <div className="register">
            <h1>Register</h1>
            <input className="sign-input-box" type="text"value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Enter Name'/>
            <input  className="sign-input-box"type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter Email'/>
            <input className="sign-input-box" type="password"value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter password'/>
            <button className='sign-button' onClick={collectData}> Sign Up</button>
        </div>
    )
}
export default SignUp
