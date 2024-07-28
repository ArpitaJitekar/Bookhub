import React from 'react'
import Myfav from './Myfav'
import '../App.css'
 

const Favourite = (props) => {
 
  return (
    <>
    <h1 className='text-center alert alert-danger'>Favourites</h1>
    <div className='fav'>
 
 { props.fav.length===0?<h1 className="alert alert-primary">oops! no favourite book </h1>:props.fav.map((f) => {
  return (
    <div>
      <Myfav  fav={f} key={props.no}  />
    </div>
  )})}
  </div>
  </>
   
      
    
  )
}

export default Favourite
