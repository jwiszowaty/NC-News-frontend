import React, { useRef } from 'react'
import '../styles/Circle.css'

function Circle({ start, setStart }) {
    const audio = useRef(null)
    
    const handleClick = () => {
        console.log(audio);
        setStart(true);
        if (audio.current) {
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
            onAnimationEnd={()=>{setStart=0}}
            ></button>
            <audio ref={audio} src='../../public/americaHas.mp3' controls/>
        </div>
  )
}

export default Circle