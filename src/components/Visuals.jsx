import React, { useState } from 'react'
import LeftScreen from './LeftScreen'
import RightScreen from './RightScreen'
import Circle from './Circle'
import { Link } from 'react-router-dom'
import '../styles/Visuals.css'
function Visuals() {
    const [start, setStart] = useState(false)
    return (
      <>
        <h1 className='beware' data-start={start}>BEWARE, MUSIC WILL PLAY</h1>
        <LeftScreen start={start}  />
        <RightScreen start={start}  />
        <Circle start={start} setStart={setStart}/>
        <Link className='home-link' to='/home'><button className='home-button'>Log In</button></Link>
        </>
  )
}

export default Visuals