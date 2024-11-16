import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/frontend_assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowlogin }) => {
    const [menu, setMenu] = useState('home');
    const [showMenu, setShowMenu] = useState(false);
    const {getCartTotal, token,setToken } = useContext(StoreContext);
    const navigate = useNavigate();
    const logout = () => {
        setToken(localStorage.removeItem('token'));
    }



    return (
        <div className='navbar'>
            <Link to={'/'}><img className='logo' src={assets.logo} alt="" /></Link>
            <ul className="navbar-menu">
                <Link to={'/'} onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>Menu</a>
                <a href='#app-download' onClick={() => setMenu('mobile-all')} className={menu === 'mobile-all' ? 'active' : ''}>Mobile-App</a>
                <a href='#footer' onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>Contact-Us</a>
            </ul>
            <div className="navbar-right">
                
                <div className='navbar-search-icon'>
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getCartTotal()===0 ? "" : "dot"}></div>
                </div>
                {
                        token ?  (<div className="navbar-profile">
                            <img src={assets.profile_icon} alt="" />
                            <ul className='nav-profile-dropdown'>
                                <li>
                                    <img src={assets.bag_icon} alt="" />
                                    <p>Orders</p>
                                </li>
                                
                                <hr />
                                <li onClick={()=>navigate('/myorders')}>
                                    <img src={assets.logout_icon} alt="" />
                                    <p onClick={logout}>Logout</p>
                                </li>
                               
                            </ul>
                        </div>) : ( 
                            <button onClick={() => setShowlogin(true)} className='mobile-sign-in'>Sign In</button>
                        )
                    }
                <img onClick={() => setShowMenu(true)} className='menu-icon' src={assets.menu_icon} alt="" />
            </div>

            {showMenu && (
                <div className={`mobile-menu ${showMenu ? 'show' : ''}`}>
                    <div className='mobile-menu-top'>
                        <img className='logo' src={assets.logo} alt="" />
                        <img onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className="mobile-menu-list">
                        <Link to={'/'} onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>Home</Link>
                        <a href='#explore-menu' onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>Menu</a>
                        <a href='#app-download' onClick={() => setMenu('mobile-all')} className={menu === 'mobile-all' ? 'active' : ''}>Mobile-App</a>
                        <a href='#footer' onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>Contact-Us</a>
                    </ul>
                    {
                        token ?  (<div className="navbar-profile">
                            <img src={assets.profile_icon} alt="" />
                            <ul className='nav-profile-dropdown'>
                                <li onClick={()=>navigate('/myorders')}>
                                    <img src={assets.bag_icon} alt="" />
                                </li>
                                <p>Orders</p>
                                <hr />
                                <li>
                                    <img src={assets.logout_icon} alt="" />
                                </li>
                                <p>Logout</p>
                            </ul>
                        </div>) : ( 
                            <button onClick={() => setShowlogin(true)} className='mobile-sign-in'>Sign In</button>
                        )
                    }
                   
                </div>
            )}
        </div>
    );
};

export default Navbar;
