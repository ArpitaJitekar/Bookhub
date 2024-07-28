import './App.css';
import Header from "./component/Header"
import Book from "./component/Book"
import Footer from "./component/Footer"
import Addbook from './component/Addbook';
import PrivateComponent from './component/PrivateComponent'
import SignUp from './component/SignUp';
import Login from './component/Login'
import Favourite from './component/Favourite';
import React,{useState,useEffect} from 'react';
import Userprofile from './component/Userprofile';
import Edituserprofile from './component/Edituserprofile';
import { BrowserRouter,Routes ,Route} from 'react-router-dom';
import Cart from './component/Cart';

function App() {
  let initfav;
  let initbook;
  const onDelete=(book)=>{
    console.log(`I am onDelete of ${book}`)
    setbooks(books.filter((e)=>{
      return e!==book
    }))
    deleteFav(book)
    localStorage.setItem("books",JSON.stringify(books))
  }
  if(localStorage.getItem("books")===null){
    initbook=[]
   }
    else{
     try {
      initbook = JSON.parse(localStorage.getItem("books"));
    } catch (e) {
      console.error("Error parsing JSON from localStorage", e);
      initbook = [];
    }
  }

    const addBook=(desc,title,author,genre,file)=>{
    
      let sno;
      if (books.length===0){
        sno=1
      }
      else{
        sno=books[(books.length-1)].sno+1
      }
      const myBook={
        sno:sno,
        title:title,
        author:author,
        file:file,
        genre:genre,
        desc:desc
      }
      setbooks([...books,myBook])
      
    }


  const [books,setbooks]=useState(initbook)
  localStorage.setItem("books",JSON.stringify(books))

 // {/for storing favourites /}


 
 
 if(localStorage.getItem("favourites")===null){
  initfav=[]
 }
  else{
   try {
    initfav = JSON.parse(localStorage.getItem("favourites"));
  } catch (e) {
    console.error("Error parsing JSON from localStorage", e);
    initfav = [];
  }
}

// for deletingfavoutites from favourite list
const deleteFav=(favBook)=>{
 console.log("i am delete for favourite")
setfav(fav.filter((e)=>{
   return  e!==favBook
}))
localStorage.setItem("favourites",JSON.stringify(fav))   
console.log("thiss is from fav file",fav)
}
 // const [active, setActive] = useState(false)
  const addfavourite=(title,author,genre,file,desc)=>{
 
   let no;
   if (fav.length===0){
     no=1
   }
   else{
   
     no=fav[(fav.length-1)].no+1
     console.log("number:",fav[(fav.length-1)].no)
   }
   let myFavourites={
     no:no,
     title:title,
     author:author,
     genre:genre,
    file:file,
     desc:desc
   }
   setfav([...fav,myFavourites])
   
  }
  const [fav,setfav]=useState(initfav)
  localStorage.setItem("favourites",JSON.stringify(fav))
//  useEffect(()=>{ },[fav])
  console.log(fav)
  

  
 let initcart
 
 if(localStorage.getItem("cart")===null){
  initcart=[]
 }
  else{
   try {
    initcart = JSON.parse(localStorage.getItem("cart"));
  } catch (e) {
    console.error("Error parsing JSON from localStorage", e);
    initcart = [];
  }
}

 
  const addtocart=(title,author,genre,file,desc)=>{
 
   let no;
   if (cart.length===0){
     no=1
   }
   else{
   
     no=cart[(cart.length-1)].no+1
     console.log("number:",cart[(cart.length-1)].no)
   }
   let mycart={
     no:no,
     title:title,
     author:author,
     genre:genre,
    file:file,
     desc:desc
   }
   setcart([...cart,mycart])
   
  }
  const [cart,setcart]=useState(initcart)
  localStorage.setItem("cart",JSON.stringify(cart))




  return (
   <>
   <BrowserRouter>
   <Header/>
   
   <Routes>
    <Route element={<PrivateComponent/>}>
    <Route path='/' element={<>
    <Book  book={books} onDelete={onDelete} addfavourite={addfavourite} addtocart={addtocart} deleteFav={deleteFav}/>
    </>}/>
    <Route path='/profile' element={<Userprofile/>}/>
    <Route path='/setprofile' element={<Edituserprofile/>}/>
    <Route path='/addBook' element={ <Addbook  addBook={addBook}/>} />
    {/* pass fav array in parameter of <Favourite/> */}
    <Route path='/favourites' element={<Favourite fav={fav}/>}/>

    <Route  path='/cart' element={<Cart  cart={cart}/>}/>
   </Route>
    <Route  path='/signup' element={<SignUp/>}/>
    <Route  path='/login' element={<Login/>}/>

    </Routes>
    <Footer/>
    </BrowserRouter>
    
  </>
  );

}
export default App;