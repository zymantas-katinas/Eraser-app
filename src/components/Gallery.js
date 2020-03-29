import React from 'react'

function Gallery(props){
    
    return (
        <div>
            <div className ="canvasImgArray">
                {props.allImg.slice(1)}
            </div>   
        </div>
            
    )
}

export default Gallery