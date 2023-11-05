import React, {useRef} from 'react'
import '../styles/Circle.css'

function Circle({ start, setStart,status, setStatus }) {
    const audio = useRef(null)
    
    const handleClick = () => {
        setStart(true);
        setStatus({ visuals: 'intro', login: 'hide' })
        
        if (audio.current) {
            console.log('playing');
            audio.current.volume = 0.1
            audio.current.play()
            .catch(error => {
                console.error("Error playing the audio:", error)
            })
        }
        setTimeout(() => {
            setStatus({ visuals: 'intro', login: 'show' })
        },37500)
    };
    
    return (
        <div id='circle-button'>
        <button 
            className="circle"
            data-start={start.toString()}
            onClick={handleClick}
            ></button>
            <audio ref={audio} controls>
                <source src='/americaHas.mp3' type='audio/mpeg'/>
            </audio>
        </div>
  )
}

export default Circle