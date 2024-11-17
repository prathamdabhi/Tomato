import { createContext, useEffect, useState } from "react";

import axios from "axios";

export const StoreContext = createContext(null);

const StoreProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(`${uri}/api/v1/cart/add`,{itemId},{headers:{token}});
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(`${uri}/api/v1/cart/remove`,{itemId},{headers:{token}});
    }
  };

  const getCartTotal = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item]; 
      }
    }
    return totalAmount
  };

  const getFoods = async () => {
    try {
      const { data } = await axios.get(`${uri}/api/v1/food/listfood`)
      setFoodList(data.food)
    } catch (error) {
      console.log(error.message)
    }
  }

  const loadCartData = async (token) => {
    try {
     const { data } = await axios.get(`${uri}/api/v1/cart/getcart`,{headers:{token}})
      setCartItems(data.cartData)
    } catch (error) {
      console.log(error.message)
    }
  }



  const uri = 'https://tomato-backend-mdla.onrender.com'
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'): ' ');


const value = {
  food_list,
  cartItems,
  setCartItems,
  addToCart,
  removeFromCart,
  getCartTotal,
  uri,token,setToken,
  setFoodList,getFoods,
  loadCartData
};

return (
  <StoreContext.Provider value={value}>{props.children}</StoreContext.Provider>
);
};

export default StoreProvider;
