import React from 'react'
function Start(props){
    return (
        <div className = "countdown">
            <button className="wideBtn"
             onClick = {props.onClick}>{props.ifStart}
             </button>
        </div>
    )
}
export default Start