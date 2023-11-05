import React, { useContext, useState } from 'react'
import axios from 'axios'
import { UserDataContext } from '../contexts/User'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'
function Login() {
  const [username, setUsername] = useState('grumpy19')
  const { userData, setUserData } = useContext(UserDataContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      setError(null)
      setLoading(true)
      await axios
        .get('https://be-jw-news.onrender.com/api/users')
        .then((response) => {
          const users = response.data.users;
          console.log(username);
          const user = users.filter((user) => user.username === username)
          if (user[0]) {
            setUserData(user[0])
            setLoading(false)
            navigate('/home?limit=5')
          } else {
            setLoading(false)
            setError('Wrong username')
            throw error
          }
        })
    } catch (error) {
      console.log('login error', error);
    }
  }
  return (
    <form className='login-form' onSubmit={handleLogin}>
        <h1>Username</h1>
        <input className='username' onChange={(e) => {
          console.log(e.target.value);
          setUsername(e.target.value)
        }} required placeholder='Use "grumpy19"' />
        <div className='home-div'><button type='submit' className='home-button'>Log In</button></div>
        {error && <h1>{error}, try again.</h1>}
        {loading && <h1>Logging in . . .</h1>}
     </form>
  )
}

export default Login