import React,{useState,useEffect,useContext} from 'react'
import './Orders.css'
import { AppContext } from '../../context/AppContext';
import {toast} from 'react-toastify'
import axios from 'axios';
import { assets } from '../../assets/admin_assets/assets';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { url } = useContext(AppContext);
  const fetchAllOrders = async () => {
    const {data} = await axios.get(`${url}/api/v1/order/list`);
    if(data.success){
      setOrders(data.data);
      console.log(data.data)
    }else{
      toast.error(data.message);
    }
  }

  const handelStatus = async (e,orderId) => {
    const { data } = await axios.post(`${url}/api/v1/order/changestatus`,{orderId,status:e.target.value})
    if(data.success){
      toast.success(data.message);
     await fetchAllOrders();
    }else{
      toast.error(data.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className='orders add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>{

          return(
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item,index)=>{
                    if(index === order.items.length - 1){
                      return item.name + 'X' + item.length
                    }else{
                      return item.name + 'X' + item.length + ','
                    }
                  })}
                </p>
                <p className='order-item-name'>{order.address.firstName +" "+ order.items.lastName}</p>
                <div className='order-item-address'>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city+","+order.address.state+","+order.address.country+","+order.address.zipcode}</p>
                  </div>
                  <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Items:{order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(e)=>handelStatus(e,order._id)} value={order.status}>
                <option value="Processing">Processing</option>
                <option value="Out Of Delivery">Out Of Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Orders
