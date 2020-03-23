import React from 'react'
function Start(props){
    return (
        <div className = "countdown">
            <button onClick = {props.onClick}>{props.title}</button>
        </div>
    )
}
export default Start