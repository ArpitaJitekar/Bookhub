import React from 'react'
 import{Link,useNavigate} from "react-router-dom"


const Header = () => {
  const navigate=useNavigate()
  const logout=()=>{
    localStorage.removeItem("user")
    navigate('/signup')
  }
  const userprofile=JSON.parse(localStorage.getItem("profile"))
  const auth=localStorage.getItem('user')
  return (
    <div>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link class="navbar-brand" to="/">Bookverse</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
      </li>
      <li class="nav-item active">
        <Link class="nav-link" to="/addBook">Add Books</Link>
      </li>
      <li class="nav-item dropdown">
        <Link class="nav-link dropdown-toggle" to="/" role="button" data-toggle="dropdown" aria-expanded="false">
          My Selections
        </Link>
        <div class="dropdown-menu">
          <Link class="dropdown-item" to="/favourites">My favourites &hearts;</Link>
          <Link class="dropdown-item" to="/cart">My cart</Link>
         </div>
      </li>
      {userprofile?<li className="nav-item ">
        <Link className="profile nav-link " to="/setprofile"> new Profile</Link>
      </li>:
      <li className="nav-item ">
      <Link className="profile nav-link " to="/profile"> Profile</Link>
    </li>
      
      }
      
        {auth?<li class="nav-item active"><Link onClick={logout} class="nav-link" to="/signup">Logout</Link></li>:
        <><li className="nav-item"><Link className="nav-link" to="/signup">sign up</Link></li>
        <li className="nav-link">
        <Link className="Login nav-item " to="/login"> Login</Link>
      </li></>}
      
     
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
    </div>
  )
}

export default Header