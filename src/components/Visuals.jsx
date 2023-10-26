import React, { useContext, useState } from 'react'
import LeftScreen from './LeftScreen'
import RightScreen from './RightScreen'
import Circle from './Circle'
import {useNavigate } from 'react-router-dom'
import '../styles/Visuals.css'
import axios from 'axios'
import { UserDataContext } from '../contexts/User'
function Visuals() {
  const navigate = useNavigate()
  const [start, setStart] = useState(false)
  const [username, setUsername] = useState('grumpy19')
  const { userData, setUserData } = useContext(UserDataContext)

  const handleLogin = async (e) => {
    e.preventDefault()
      try {
        await axios
          .get('https://be-jw-news.onrender.com/api/users')
          .then((response) => {
            const users = response.data.users;
            console.log(username);
          const user = users.filter((user) => user.username === username)
          setUserData(user[0])
          navigate('/home')
          })
      } catch (error) {
        console.log('login error', error);
      }
    }
    return (
      <>
        <h1 className='beware' data-start={start}>BEWARE, MUSIC WILL PLAY</h1>
        <LeftScreen start={start}  />
        <RightScreen start={start}  />
        <Circle start={start} setStart={setStart} />
        <form className='login-form' onSubmit={handleLogin}>
          <input className='username' onChange={(e) => {
            console.log(e.target.value);
            setUsername(e.target.value)
          }} required placeholder='Use "grumpy19"' ></input>
          <div className='home-div'><button type='submit' className='home-button'>Log In</button></div>
        </form>
        </>
  )
}

export default Visuals