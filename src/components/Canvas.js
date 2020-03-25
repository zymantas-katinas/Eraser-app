import React, { useState, useEffect, useRef } from 'react'

export default function Canvas(props) {
  const [drawing, setDrawing] = useState(false)
  const [restart, setRestart] = useState(true)
  
  const canvasRef = useRef()
  const ctx = useRef()
  const converted = useRef()
  
  useEffect(() => {
    ctx.current = canvasRef.current.getContext('2d')
    // ctx.current.fillStyle = "#17252A"
    // ctx.current.fillRect(0, 0, 415, 415)

    // ctx.current.strokeStyle = "#3AAFA9"
    // ctx.current.lineWidth = 20
    // ctx.current.strokeRect(0, 0, 415, 415)
   
  }, [])

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

   //clear function
  function handleClear() {
     ctx.current.clearRect(0, 0, 415, 415)
  }

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


  function startDrawing(e) {
    ctx.current.lineJoin = 'round'
    ctx.current.lineCap = 'round'
    ctx.current.lineWidth = 20
    // ctx.current.strokeStyle = "#3AAFA9"
    ctx.current.strokeStyle = "white"
    ctx.current.beginPath();
    // actual coordinates
    ctx.current.moveTo(
      e.clientX - canvasRef.current.offsetLeft,
      e.pageY - canvasRef.current.offsetTop
    )
  }

  function stopDrawing() {
    ctx.current.closePath()
    // setDrawing(false)
  }
  function handleClick(){
    // setDrawing(true)
    // console.log(props.title)
  }

  function download(){
    const dataURI = canvasRef.current.toDataURL();
    console.log(dataURI)
    converted.current.src = dataURI
  
    // canvasRef.current.download = "mypainting.png";
  }
  return (
    <div>
      <button onClick ={download}> download </button>
      <div className ="canvas"> <img ref={converted} src="" /></div>
      <div className ="canvas">
        <canvas
        ref={canvasRef}
        width={415}
        height={415}
        // onMouseDown={startDrawing}
        onMouseOver={startDrawing}
        // onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        />
      </div>
    </div>
  )
}

// test eraserx

function test-eraser(){
  return true
}