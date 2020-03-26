import React, { useState, useEffect, useRef } from 'react'

export default function Canvas(props) {
  const [drawing, setDrawing] = useState(false)
  // const [restart, setRestart] = useState(true)
  const [imgArr, setImgArr] = useState([])
  const [title, setTitle] = useState("")

  
  const canvasRef = useRef()
  const ctx = useRef()
  
  useEffect(() => {
    ctx.current = canvasRef.current.getContext('2d')   
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

  // push imgArr to App
  useEffect(() => {
    props.getArr(imgArr)
  }, [imgArr])

  // push img Src and Title to imgArr state when POST is clicked
  useEffect(()=>{
    const dataURI = canvasRef.current.toDataURL();
    setImgArr(item =>  { return[...item, { src: dataURI, title: title, id: imgArr.length }] }  )
    console.log('post clicked ')
  },[props.onPostClick] )
    

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

 // begin path / start drawing
  function startDrawing(e) {
    ctx.current.lineJoin = 'round'
    ctx.current.lineCap = 'round'
    ctx.current.lineWidth = 20
    ctx.current.strokeStyle = "#3AAFA9"
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

  // set current title state when typing to input
  function inputTitle(event){
    event.preventDefault()
      setTitle(event.target.value)
   }



  return (
    <div className ="canvas">
      {props.ifFinished ? <input type="text" name="title" placeholder ="TITLE" autocomplete="off"  onChange={inputTitle} /> : null}
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

