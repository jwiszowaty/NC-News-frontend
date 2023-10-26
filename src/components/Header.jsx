import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Header.css'
import head from '../assets/head-spiral.png';

function Header() {
  return (
    <>
      <section id='header-section' className='header'>
      <Link to='/home'><div id='header-title'>NC News</div></Link>
      <Link to='/account'><div id='account-button'>Account</div></Link>
      </section>
      <div className='logo-container'>
      <img className='head-logo' src={head} />
      </div>
    </>
    
  )
}

export default Header