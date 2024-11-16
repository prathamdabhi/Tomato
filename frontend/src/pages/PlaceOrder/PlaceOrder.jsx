import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const {getCartTotal,token,food_list,uri,cartItems} = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  });

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

    let orderData = {
      address:data,
      items:orderItems,
      amount:getCartTotal() + 20,
    }
    let response = await axios.post(`${uri}/api/v1/order/place`,orderData,{headers:{token}}); 
    if(response.data.success){
      const { session_url } = response.data;
      window.location.replace(session_url);
    }else{
      alert(response.data.message || 'ERROR')
    }
  }

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(prev => ({...prev,[name]:value}));
  }

  useEffect(() => {
    if (!token) {
      navigate('/cart');
      alert('You are not logged in');
    }else if(getCartTotal() === 0){
      navigate('/cart');
      alert('Cart is empty');
    }
  }, [token]);


  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
       <p className='title'> Delivery Information</p>
       <div className="multi-fields">
        <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
        <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
       </div>
       <input required name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Email Address'/>
       <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>

       <div className="multi-fields">
        <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
        <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
       </div>

       <div className="multi-fields">
        <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zipcode' />
        <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
       </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="Number" placeholder='Phone' />
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
          <button type='submit'>Proceed To Payment</button>
        </div>
        </div>
    </form>
  )
}

export default PlaceOrder
