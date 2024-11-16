import React, { useContext, useEffect, useState } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {
 const [searchParms, setSearchParms] = useSearchParams();
 const success = searchParms.get('success');
 const orderId = searchParms.get('orderId');
 const navigate = useNavigate();

 const { uri, token } = useContext(StoreContext);

 const verifyPayment = async () => {
    const { data } = await axios.post(`${uri}/api/v1/order/verify`,{orderId,success},{headers:{token}});
    if(data.success){
        navigate('/myorders');
    }else{
        navigate('/');
    }
 }

 useEffect(() => {
    verifyPayment()
 }, []);

  
  return (
    <div className='verify'>
        <div className="spinner">

        </div>
    </div>
  )
}

export default Verify
