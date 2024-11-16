import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/frontend_assets/assets'
const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
      <p className='explore-menu-text'> Discover a selection of dishes crafted to satisfy any craving. From quick bites to hearty meals and refreshing desserts, there’s something for everyone. Customize your order and enjoy fresh, quality food delivered to your door.</p>
      <div className='explore-menu-list'>
        {
            menu_list.map((item,index) => (
                <div onClick={() => setCategory(prev => prev === item.menu_name ? 'All' : item.menu_name)} key={index} className='explore-menu-item'>
                    <img className={category === item.menu_name ? 'active' : ''} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            ))
        }
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
