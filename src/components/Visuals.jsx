import React, { useContext, useState } from 'react'
import LeftScreen from './LeftScreen'
import RightScreen from './RightScreen'
import Circle from './Circle'
import '../styles/Visuals.css'
import Login from './Login'
function Visuals() {
  const [start, setStart] = useState(false)
  const [status, setStatus] = useState({visuals: 'warning', login: 'hide'})
  
  return (
    <section id='landing-page' data-start={start}>
      <Circle start={start} setStart={setStart} status={status} setStatus={setStatus} />
    
    {status.visuals === 'warning' && <h1 className='beware' data-start={start}>BEWARE, MUSIC WILL PLAY</h1>}
  {
    status.visuals === 'intro' && <>
    <LeftScreen start={start} />
    <RightScreen start={start} />
    </>
      }
    {status.login === 'show' && <Login />}
  </section>
  )
}

export default Visuals