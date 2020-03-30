import React from 'react'

function Countdown(props){

    return (
        <div className = "countdown">
            {props.time !== 0 ? <h1>{props.time}s</h1> : null}
             {/* <h1>{props.time}</h1> */}
        </div>
        
    )
}
export default Countdown