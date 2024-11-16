import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import {useNavigate} from 'react-router-dom'

const Cart = () => {
  const { cartItems, food_list, uri, removeFromCart,getCartTotal} = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className='cart'>
      <div className="cart-item">
      <div className="cart-items-title">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quentity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <br />
      <hr />
      {
        food_list.map((item,index)=>{
         if(cartItems[item._id] > 0){
          console.log(cartItems[item._id])
          return (
            <div key={cartItems[item._id]}>
            <div  className='cart-items-title cart-items-item'>
             <img src={uri+'/images/'+item.image} alt="" />
             <p className='item-name'>{item.name}</p>
             <p>${item.price}</p>
             <p>{cartItems[item._id]}</p>
             <p>${item.price * cartItems[item._id]}</p>
             <p onClick={()=>removeFromCart(item._id)} className='cross'>X</p>
            </div>
            <hr />
            </div>
          )
         }
        })}
      </div>
      <div className='cart-bottom'>
        <div className='cart-total'>
        <h2>Cart Total</h2>
        <div>
          <div className="cart-total-ditals">
            <p>Subtotal</p>
            <p>${getCartTotal()}</p>
          </div>
          <hr />
          <div className="cart-total-ditals">
            <p>Delivery Fees</p>
            <p>${getCartTotal()===0?0:20}</p>
          </div>
          <hr />
          <div className="cart-total-ditals">
            <b>Total</b>
            <b>${getCartTotal() ===0 ?0 : getCartTotal() + 20}</b>
          </div>
          <button onClick={()=>navigate('/order')}>Proceed To Checkout</button>
        </div>
        </div>
        <div className='cart-promocode'>
          <p>If you have a promocode, Enter it here</p>
          <div className='cart-promocode-input'>
            <input type="text" placeholder='promocode'  />
            <button>Submit</button>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Cart
