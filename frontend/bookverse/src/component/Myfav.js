import {React} from 'react'

const Myfav = (props) => {


  return (
    <div className="myfav">
      <li className='fav-li'>Name:{props.fav.title}</li>
      <li className='fav-li'>Author:{props.fav.author}</li>
      <li className='fav-li'>Genre:{props.fav.genre}</li>
      <img src={props.fav.file} className="fav-img"alt={props.fav.title}/>
      <p className='fav-li'>Description:{props.fav.desc}</p>
    </div>
  )
}

export default Myfav
