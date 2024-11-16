import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {
  const {getCartTotal} = useContext(StoreContext);
  return (
    <div className='place-order'>
      <div className='place-order-left'>
       <p className='title'> Delivery Information</p>
       <div className="multi-fields">
        <input type="text" placeholder='First Name' />
        <input type="text" placeholder='Last Name' />
       </div>
       <input type="text" placeholder='Email Address'/>
       <input type="text" placeholder='Street'/>

       <div className="multi-fields">
        <input type="text" placeholder='City' />
        <input type="text" placeholder='State' />
       </div>

       <div className="multi-fields">
        <input type="text" placeholder='Zipcode' />
        <input type="text" placeholder='Country' />
       </div>
        <input type="Number" placeholder='Phone' />
      </div>

      <div className='place-order-right'></div>
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
          <button >Proceed To Payment</button>
        </div>
        </div>
    </div>
  )
}

export default PlaceOrder
