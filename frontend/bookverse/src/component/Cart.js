import React from 'react'
import Mycart from './Mycart'
const Cart = (props) => {
  return (
    <div>
        <>
    <h1 className='text-center alert alert-warning'>Cart</h1>
    <div className='cart'>
 
 { props.cart.length===0?<h1 className="alert alert-success">oops! no  book added to cart</h1>:props.cart.map((f) => {
  return (
    <div>
      <Mycart  cart={f} key={props.no}  />
    </div>
  )})}
  </div>
  </>
    </div>
  )
}

export default Cart
