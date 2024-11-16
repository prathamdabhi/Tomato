import React, { useContext, useEffect, useState } from 'react'
import './ListProducts.css'
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify'

const ListProducts = () => {
  const [list, setList] = useState([]);
  const { url } = useContext(AppContext);
  const fetchData = async () => {
    const { data } = await axios.get(`${url}/api/v1/food/listfood`)
    if(data.success){
      setList(data.food); 
    }else{
      toast.error('something went wrong');
    }
  }

  const removeFood = async (id) => {
    const { data } = await axios.post(`${url}/api/v1/food/removefood`,{id})
    await fetchData();
    if(data.success){
      toast.success(data.message);
    }else{
      toast.error(data.message);
    }
  }

  useEffect(() => {
    fetchData()
  }, [list]);
  return (
    <div className='list add flex-col'>
      <p className='head'>All Foods List</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list.map((item,index)=>{
            return (
              <div key={index} className='list-table-format'>
                <img src={`${url}/images/${item.image} `} alt="" />
                <p>
                {item.name}
                </p>
                <p>
                 { item.category}
                </p>
                <p>
                  {item.price}
                </p>
                <p onClick={()=>removeFood(item._id)} className='cross'>❌</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ListProducts
