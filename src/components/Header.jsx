import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Header.css'
import head from '../assets/head-spiral.png';

function Header() {
  return (
    <>
      <section id='header-section' className='header'>
        <Link to={{pathname:'/home', search:'?limit=5'}} id='header-title'><div >NC News</div></Link>
        <Link to={{pathname:'/home', search:'?limit=5'}}><img className='head-logo' src={head} /></Link>
      <Link to='/account' id='account-button'><div >Account</div></Link>
      </section>
      
    </>
    
  )
}

export default Header