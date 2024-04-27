import React, { useState } from 'react'
import './Navbar.css'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart-icon.png'
import { Link } from 'react-router-dom'

const Navbar = () => {

const [menu, setMenu] = useState('shop');

  return (
    <div className='navbar'>
       <div className='nvlogo'>
          <img className='logo' src={logo} alt="logo" />
          <p>ComfyCorner Clothing</p>
       </div>

       <ul className='nvmenu'>
       <li onClick={()=>{setMenu('shop')}}><Link style={{textDecoration: 'none'}} to='/'>Products</Link>{menu === 'shop'? <hr/>:<></>}</li>
       <li onClick={()=>{setMenu('mens')}}><Link style={{textDecoration: 'none'}} to='/mens'>Men</Link>{menu === 'mens'? <hr/>:<></>}</li>
       <li onClick={()=>{setMenu('womens')}}><Link style={{textDecoration: 'none'}} to='/womens'>Women</Link>{menu === 'womens'? <hr/>:<></>}</li>
       </ul>
       <div className='login-btn'>
        <Link to='/login'><button>Login</button></Link>
        <Link to='/cart'><img className='cart' src={cart_icon} alt="cart" /></Link>
        <div className='nvcart-count'>0</div>
       </div>
    </div>
  )
}

export default Navbar
