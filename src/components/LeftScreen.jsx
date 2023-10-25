import React from 'react'
import '../styles/Screens.css'

function LeftScreen({start}) {
  return (
    <div className="left" data-start={start}>
      <div className="left-img" data-start={start}></div>
    </div>
  )
}

export default LeftScreen