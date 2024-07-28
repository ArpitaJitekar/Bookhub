import React from 'react'
import Eachbook from "./Eachbook"
const Book = (props) => {
  
  return(
    <>
    <h1 className='text-center alert alert-success'>Books</h1>
    <div className='user-books'>
 
 { props.book.length===0?<h1 className="alert alert-primary">No books to diplay</h1>:props.book.map((b) => {
  return (
    <div>
      <Eachbook book={b} key={b.sno} onDelete={props.onDelete} addfavourite={props.addfavourite} addtocart={props.addtocart} deleteFav={props.deleteFav}/>
    </div>
  )})}
  </div>
  </>
)
}


export default Book