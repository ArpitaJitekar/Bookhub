import {React}from "react";
// import Heart from "react-animated-heart";

// import Heart from "react-heart"

import '../App.css';


const Eachbook = ({book,onDelete,addfavourite,deleteFav,addtocart}) => {
 
  // const[isClick,setClick]=useState(false)

 
//  const favFunction=()=>{
//   let b;
//   setClick(!isClick)
//   if(isClick){
//   addfavourite(book.title,book.author,book.genre,book.coverImage,book.desc)
//   b=book
//   }
//   else{
//   deleteFav(b)
//   }
//  }


 
 console.log("this is img",book.file)
      return (
        <div className="book-div">
       <h3 className="book-tile">{book.title}</h3>
       <ul className="book-author" >
        <li >Author:{book.author}</li>
        <li>Genre:{book.genre}</li>
       </ul>
       <img src={book.file} className="img-book" alt={book.title}/>
       <p className="desc">Description:{book.desc}</p>
       <div className="btn-fav-delete">
       <button className="btn btn-danger" onClick={()=>{onDelete(book)}}>Delete</button>
       {/* <Heart isClick={isClick} onClick={() =>{favFunction()} }/> */}
       <button className='mx-3 btn-fav' onClick={()=>{addfavourite(book.title,book.author,book.genre,book.file,book.desc)}}> Favorites
       </button>

    
       <button onClick={()=>{addtocart(book.title,book.author,book.genre,book.file,book.desc)}}>Add to cart</button>
       </div>
        </div>
      )
    
  
  
}


export default Eachbook