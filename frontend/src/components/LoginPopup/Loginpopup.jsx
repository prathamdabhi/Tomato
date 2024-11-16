import React, { useContext, useState } from 'react'
import './Loginpopup.css'
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';



/*************  ✨ Codeium Command ⭐  *************/
/**
/******  9867b937-699d-4bb3-852a-5e6b4dfd463c  *******/
const Loginpopup = ({setShowlogin}) => {
    const { uri,token,setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState('Sign Up');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  

    const onSubmitHandler = async (e) => {
      e.preventDefault();
      
      try {
        if(currState === 'Sign Up'){
          const { data } = await axios.post(`${uri}/api/v1/user/register`,{name,email,password})
          console.log(data)
          if(data.success){
              
              setToken(data.token);
              localStorage.setItem('token',data.token);
             
              toast.success('Account created successfully');
              setShowlogin(false)
          }else{
            toast.error(data.message)
          }
        }else{
          const { data } = await axios.post(`${uri}/api/v1/user/login`,{email,password})
          if(data.success){
            
            setToken(data.token);
            localStorage.setItem('token',data.token);
            
            toast.success('Logged in successfully');
            setShowlogin(false)
          }else{
            toast.error(data.message)
          }
        }
      } catch (error) {
        console.log(error.message)
      }
    }


  return (
    <div className='login-popup'>
      <form onSubmit={onSubmitHandler} className="login-popup-container">
        <div className="login-popup-title">
            <h1>{currState}</h1>
            <img onClick={()=> setShowlogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
            {currState === "Login" ? <></> : <input type="text" onChange={(e)=>setName(e.target.value)} value={name} placeholder='Your name'  required /> }
           
            <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Your email' required />
            <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Your password' required />
        </div>
        <button type='submit'>{currState === 'Sign Up' ? 'Create Account' : 'Login'}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By Continuing, i agree to the Terms of Use and Privacy Policy</p>
        </div>
        {currState === 'Login' ? <p>Create a new account? <span onClick={()=>setCurrState('Sign Up')}>Click here</span></p> : <p>Already has account? <span onClick={()=>setCurrState('Login')}>Login here</span></p>}
        
        
      </form>
    </div>
  )
}

export default Loginpopup
