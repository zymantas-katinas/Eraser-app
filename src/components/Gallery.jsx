import React , {useState, useEffect, useRef} from 'react';
import Artpiece from './Artpiece'
import axios from 'axios';


function Gallery(){

    const [artpieces, setArtpieces] = useState([])
    const [loading, setLoading] = useState(true)

    // load artpieces 
    useEffect(()=> {
        axios.get('http://localhost:5000/artpieces/')
        .then(response => {
            setLoading(false)
            setArtpieces(response.data)  
        })
        .catch((error) => {
          console.log(error);
        })   
    },[])

    function deleteArtpiece(id){
        axios.delete('http://localhost:5000/artpieces/'+id)
        .then(response => { console.log(response.data)});

        setArtpieces(
            artpieces.filter(el => el._id !== id)
        )
    }

    const all = artpieces.map(item => { 
        return (
            <Artpiece key={item._id} item={item} clickEvent = {() => {deleteArtpiece(item._id)}}/>
        )
     })

    return (
        <div className ="gallery">
            <h1> GALLERY </h1>
            <div className ="gallery__artpieces">
               {loading ?  <div class="lds-ripple"><div></div><div></div></div> : all}
            </div>   
        </div>
            
    )
}

export default Gallery
