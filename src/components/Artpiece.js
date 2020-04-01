import React ,{useState, useEffect} from 'react'

function Artpiece(props){


    function artpieceClick(e){
        e.currentTarget.classList.toggle("size")

        // const allDivs = Object.values(document.querySelectorAll(".gallery__artpiece"))
        // const otherDivs = allDivs.filter(div => div !== e.currentTarget)
        // otherDivs.map(div => div.classList.toggle("displayNone"))

    }

    return (
    <div onClick={artpieceClick} className ="gallery__artpiece">
        <button onClick={props.clickEvent} className = "del">x</button>
        <img  src={props.item.uri} alt="artpiece" />
        <p>{props.item.title}</p>
    </div>
    )
}

export default Artpiece