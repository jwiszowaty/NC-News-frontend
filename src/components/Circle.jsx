import React, { useRef } from 'react'
import '../styles/Circle.css'

function Circle({ start, setStart }) {
    const audio = useRef(null)
    
    const handleClick = () => {
        setStart(true);
        if (audio.current) {
            audio.current.volume = 0.1
            audio.current.play().catch(error => {
                console.error("Error playing the audio:", error)
            });
        }
    };
    
    return (
        <div id='circle-button'>
        <button 
            className="circle"
            data-start={start.toString()}
            onClick={handleClick}
            ></button>
            <audio ref={audio} src='../../public/americaHas.mp3' controls/>
        </div>
  )
}

export default Circle