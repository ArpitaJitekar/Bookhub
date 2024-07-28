import React from 'react'

const Mycart = (props) => {
  return (
    <div>
      <div className="mycart">
      <li className='cart-li'>Name:{props.cart.title}</li>
      <li className='cart-li'>Author:{props.cart.author}</li>
      <li className='cart-li'>Genre:{props.cart.genre}</li>
      <img src={props.cart.file} className='cart-img' alt={props.cart.title}/>
      <p className='cart-li'>Description:{props.cart.desc}</p>
    </div>
    </div>
  )
}

export default Mycart
