import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function Canvas(props) {
  const [drawing, setDrawing] = useState(false)
  const [title, setTitle] = useState("")
  const [src, setSrc] = useState()

  const postRef = useRef()
  const canvasRect = useRef()
  const inputRef = useRef()

  // set drawing URI to state when time is finished
  useEffect(()=>{
    const dataURI = canvasRef.current.toDataURL();
    setSrc(dataURI)
  },[props.ifFinished] )  

  // set current title state when typing to input
  const inputTitle = (event) => {
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
  const clickPost = () => {  
    if(title){
      axios.post('/api/artpieces/add', artpiece)
      .then(res => console.log(res.data));

      // styling when post clicked
      // canvasRect.current.classList.add('canvas__rectPostClick')
      canvasRect.current.style.transition = "0.5s"
      canvasRect.current.style.transform = `translate(${window.innerWidth + canvasRect.current.style.width}px)`
      canvasRect.current.style.opacity = "0"
      postRef.current.style.opacity = "0"
      inputRef.current.style.opacity = "0"
      setTimeout(() =>{ 
        canvasRect.current.style.transition = "0s"
        canvasRect.current.style.transform = `translate(-${window.innerWidth + canvasRect.current.style.width}px)`
      }, 550)
      setTimeout(() =>{
        setTitle("")
        canvasRect.current.style.transition = "0.4s"
        canvasRect.current.style.opacity = "1"
        canvasRect.current.style.transform = "none"
        props.reset()
      }, 1000)
    } else {
      inputRef.current.style.transform = "translate(3px, 3px)"
      setTimeout(() =>{
        inputRef.current.style.transform = "translate(0)"
      }, 100)
    }
  }

  // hide post button if tite is empty
  useEffect(() => {
    if(props.ifFinished){
      if(title){
        postRef.current.style.opacity = '1'
      } else {
        postRef.current.style.opacity = '0.3'
      }
    }
  }, [title])

 // ------- DRAW 
 const canvasRef = useRef()
 const ctx = useRef()
 useEffect(() => {
   ctx.current = canvasRef.current.getContext('2d')   
 }, [])

  // draw when moving mouse if draw = true
  const handleMouseMove = (e) => {
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
  const startDrawing = (e) => {
    if(ctx.current){
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
  }

  const stopDrawing = () => {
    ctx.current.closePath()
  }

  //clear function
  const handleClear = () => {
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
      canvasRect.current.classList.add('canvas__rectFinished')
      setTimeout(() =>{
        canvasRect.current.classList.remove('canvas__rectFinished')
      }, 300)
    } 
  }, [props.ifFinished])

  const shake = () => {
    if(props.ifFinished) {
      canvasRect.current.style.transition = "0"
      let count = 1
      const shaker = setInterval(() => {
        count += 1
        if(count % 2 === 0){
          canvasRect.current.style.transform = "translate(10px, 10px)"
          canvasRect.current.style.transform = "rotate(5deg)"
        } else {
          canvasRect.current.style.transform = "translate(-10px, -10px)"
          canvasRect.current.style.transform = "rotate(-5deg)"
        }
        if(count > 20){
          canvasRect.current.style.transform = "translate(0)"
          canvasRect.current.style.transform = "rotate(0)"
          clearInterval(shaker)
        }
      }, 50)
    }
  }

  return (
    <div className ="canvas">
      {props.ifFinished ? 
       <div className ="canvas__btnInput">
          <button ref= {postRef} className ="wideBtn" onClick ={clickPost}>post</button>
          <input 
            ref ={inputRef}
            type="text" 
            name="title" 
            placeholder ="TITLE" 
            autoComplete="off"  
            onChange={inputTitle} 
            value={title}
          /> 
        </div>
      : null}

      <div ref = {canvasRect} className ="canvas__rect">
        <canvas
        ref={canvasRef}
        width={415}
        height={415}
        onClick={shake}
        // onMouseUp={stopDrawing}
        onMouseOver={startDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        />
      </div>
    </div>
  )
}

