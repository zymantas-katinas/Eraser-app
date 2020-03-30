import React , {useState, useEffect, useRef} from 'react';
import axios from 'axios';

function Gallery(){

    const [artpieces, setArtpieces] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:5000/artpieces/')
        .then(response => {
            setArtpieces(response.data)
            // console.log(response.data)
        })
       
        
        .catch((error) => {
          console.log(error);
        })   
    },[])
    
    function artpieceClick(e){
    //    galleryArtpiece.current.classList.toggle("size")
         e.target.classList.toggle("size")
    }

    const all = artpieces.map(item => { 
            return (
                <div onClick={artpieceClick} key={item._id} className ="gallery__artpiece">
                    <img src={item.uri} alt="artpiece" /> 
                    <p>{item.title}</p> 
                </div>)
     })
 

    return (
        <div className ="gallery">
            <h1> GALLERY </h1>
            <div className ="gallery__artpieces">
                {all}
            </div>   
        </div>
            
    )
}

export default Gallery