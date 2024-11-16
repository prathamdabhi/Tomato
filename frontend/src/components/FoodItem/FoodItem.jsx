import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext';
const FoodItem = ({id,name,price,description,image}) => {

  const [itemCount, setItemCount] = useState(0);
  const { cartItems, addToCart, removeFromCart,uri} = useContext(StoreContext);
  return (
    <div className='food-item slide-fwd-center'>
        <div className='food-item-image-container'>
            <img className='food-item-image' src={ `${uri}/images/${image}` } alt="" />
            {
              !cartItems[id] ? (<img onClick={()=>addToCart(id)} className='add' src={assets.add_icon_white} alt="" />) : (<div className='food-item-counter'>
                <img className='img' onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt=""  />
                <p>{cartItems[id]}</p>
                <img className='img' onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
              </div>)
            }
        </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
         <p>{name}</p>
         <img src={assets.rating_starts} alt="" /> 
         </div>
         <p className='food-item-desc'>{description}</p>
         <p className='food-item-price'>${price}</p>
        
      </div>
    </div>
  )
}

export default FoodItem
