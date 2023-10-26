import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Header.css'
import head from '../assets/head-spiral.png';

function Header() {
  return (
    <>
      <section id='header-section' className='header'>
        <Link to='/home' id='header-title'><div >NC News</div></Link>
      <img className='head-logo' src={head} />
      <Link to='/account' id='account-button'><div >Account</div></Link>
      </section>
      
    </>
    
  )
}

export default Header