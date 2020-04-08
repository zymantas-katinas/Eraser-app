import React from 'react'

function Countdown(props){

    return (
        <div className = "countdown">
            {props.time !== 0 ? <h1>{props.time}s</h1> : null}
        </div>
        
    )
}
export default Countdown