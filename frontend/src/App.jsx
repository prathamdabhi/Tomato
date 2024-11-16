
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import { useState } from 'react'
import Loginpopup from './components/LoginPopup/Loginpopup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/verify/verify'
import MyOrders from './pages/MyOrders/MyOrders'

function App() {

  const [showlogin, setShowlogin] = useState(false);

  return (
    <>
    <ToastContainer />
    {
      showlogin ? <Loginpopup setShowlogin={setShowlogin} /> :(<>
      <div className='app'>
        
        <Navbar setShowlogin={setShowlogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
      </>)
    }
    </>
  )
}

export default App
