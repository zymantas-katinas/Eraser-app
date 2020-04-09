import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';

export default function Canvas(props) {
  const [drawing, setDrawing] = useState(false)
  const [title, setTitle] = useState("")
  const [src, setSrc] = useState()

  // set drawing URI to state when time is finished
  useEffect(()=>{
    const dataURI = canvasRef.current.toDataURL();
    setSrc(dataURI)
  },[props.ifFinished] )  

  // set current title state when typing to input
  function inputTitle(event){
    event.preventDefault()
      setTitle(event.target.value)
    }
    
  //----- POST artpiece to DB when post is clicked
    const artpiece = {
      username: "zymka je",
      title: title,
      uri: src,
      duration: props.drawingTime,
    }
    function clickPost(){
      // axios.post('http://localhost:5000/artpieces/add', artpiece)
      axios.post('/api/artpieces/add', artpiece)
      .then(res => console.log(res.data));
      console.log(artpiece)
    }

 // ------- DRAW 
 const canvasRef = useRef()
 const ctx = useRef()
 useEffect(() => {
   ctx.current = canvasRef.current.getContext('2d')   
 }, [])

  // draw when moving mouse if draw = true
  function handleMouseMove(e) {
    const coords = [
      e.clientX - canvasRef.current.offsetLeft,
      e.pageY - canvasRef.current.offsetTop
    ]
    if (drawing) { 
      ctx.current.lineTo(...coords)
      ctx.current.stroke()
    }
  }
 // begin path / start drawing
  function startDrawing(e) {
    ctx.current.lineJoin = 'round'
    ctx.current.lineCap = 'round'
    ctx.current.lineWidth = 20
        // get background color and set brush color
        const appDiv = document.querySelector("body")
        const appStyle = getComputedStyle(appDiv)
        const color = appStyle.backgroundColor    
    ctx.current.strokeStyle = color
    ctx.current.beginPath();
    // actual coordinates
    ctx.current.moveTo(
      e.clientX - canvasRef.current.offsetLeft,
      e.pageY - canvasRef.current.offsetTop
    )
  }

  function stopDrawing() {
    ctx.current.closePath()
  }

  //clear function
  function handleClear() {
    ctx.current.clearRect(0, 0, 415, 415)
 }

 // ------- TIMER 
  // Reset if reset/start is clicked in parent.
  useEffect(() => {
    handleClear()
    if(props.ifStart === "reset"){
      setDrawing(true)
    } else {
      setDrawing(false)
    }
  }, [props.ifStart])

  // Stop when time is 0
  useEffect(() => {
    if(props.ifFinished){
      setDrawing(false)
    } 
  }, [props.ifFinished])


  return (
    <div className ="canvas">

      {props.ifFinished ? 
       <div>
          <button className ="wideBtn" onClick ={clickPost}>post</button>
          <input 
            type="text" 
            name="title" 
            placeholder ="TITLE" 
            autoComplete="off"  
            onChange={inputTitle} 
            value={title}
          /> 
        </div>
      : null}

      <div className ="canvas__rect">
        <canvas
        ref={canvasRef}
        width={415}
        height={415}
        // onMouseDown={startDrawing}
        // onMouseUp={stopDrawing}
        onMouseOver={startDrawing}
        onMouseOut={stopDrawing}
        onMouseMove={handleMouseMove}
        />
      </div>
    </div>
  )
}

