import React, {useContext, useState } from 'react'
import './AddProducts.css'
import { assets } from '../../assets/admin_assets/assets'
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const AddProducts = () => {
  const { url } = useContext(AppContext); 
  const [image, setImage] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Salad');

  const onSubmithandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name',name);
    formData.append('description',description);
    formData.append('category',category);
    formData.append('price',Number(price));
    formData.append('image',image);

    try {
      const { data } = await axios.post(`${url}/api/v1/food/addfood`,formData)
      if(data.success){
        setImage(false);
        setName('');
        setDescription('');
        setCategory('Salad');
        setPrice('');
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  

 
  return (
    <div className='add-products'>
      <form onSubmit={onSubmithandler} className='flex-col'>
        <div className="add-image flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img  src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
        <p>Product Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Type Here' required />
        </div>
        <div className="add-product-discription flex-col">
        <p>Product Description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description}  rows='6' placeholder='write your product discription' required></textarea>
        </div>
        <div className="add-category-price">
          <div className='add-category flex-col'>
            <p>Product Category</p>
            <select onChange={(e)=>setCategory(e.target.value)} value={category}  >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">SandWich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={(e)=>setPrice(e.target.value)} value={price} type="Number"  placeholder='$20' required />
          </div>
        </div>
        <button type='submit' className='add-btn'>Add Product</button>
      </form>
      
    </div>
  )
}

export default AddProducts

