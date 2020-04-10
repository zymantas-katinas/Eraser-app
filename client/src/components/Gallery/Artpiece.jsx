import React from 'react'

function Artpiece(props){

    function artpieceClick(e){
        e.currentTarget.classList.toggle("size")
    }

    return (
    <div onClick={artpieceClick} className ="gallery__artpiece">
        {/* <button onClick={props.clickEvent} className = "del">x</button> */}
        <img  src={props.item.uri} alt="artpiece" />
        <p>{props.item.title}</p>
    </div>
    )
}

export default Artpiece