import React, {useEffect, useRef} from 'react'

function Countdown(props){
    const time = useRef()
   
    useEffect(() => {
        if(props.time){
            if(props.time < 5) {
                time.current.style.opacity = "1"
                time.current.style.transition = "0s"
                time.current.style.transform = "scale(1.2)"
                setTimeout(() => {
                    time.current.style.opacity = "0"
                    time.current.style.transition = "0.7s"
                    time.current.style.transform = "scale(1)"
                }, 300)
            }
        }        
    }, [props.time])
    return (
        <div className = "countdown">
            {props.time !== 0 ? <h1 ref = {time}>{props.time}s</h1> : null}
        </div>
    )
}
export default Countdown