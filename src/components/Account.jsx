import React, { useContext } from 'react'
import { UserDataContext } from '../contexts/User'
import { Link, Navigate, useNavigate } from 'react-router-dom';

function Account() {
  const { userData, setUserData } = useContext(UserDataContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    setTimeout(() => {
      setUserData('logged-out')
    },1000)
    setTimeout(() => {
      localStorage.removeItem('userData')
      navigate('/')
    }, 3000)
    
  }
  if (userData === 'logged-out') return <h1>Logging out . . .</h1>
  if (userData === null) return ( 
    <>
      <Link to='/home'><button>home</button></Link>
      <div>Account</div>
    </>

  )
  return (
    <>
    <Link to='/home'><button>home</button></Link>
      <div>Account</div>
      <h3>{userData.username}</h3>
      <h3>{userData.name}</h3>
      <img src={userData.avatar_url} alt="" />
      <button onClick={handleLogout}>Log out</button>
    </>
  )
}

export default Account