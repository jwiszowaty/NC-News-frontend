import React from 'react'
import '../styles/Screens.css'

function RightScreen({start}) {
  return (
    <div className="right" data-start={start}>
      <div className="right-img" data-start={start}></div>
    </div>
    
  )
}

export default RightScreen