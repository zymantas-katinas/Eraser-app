import React, {useState, useEffect, useRef} from 'react';
import Countdown from './Countdown';
import Canvas from './Canvas';
import Start from './Start';

 
function Draw() {
  const [clock, setClock] = useState(10)
  const [limit, setLimit] = useState(10)
  const [startRestart, setStartRestart] = useState("start")
  const [finished, setFinished] = useState(false)
  const [pointerPos, setPointerPos] = useState([{x: 0, y: 0}])

  // start stop timer
  useEffect(() => {   
    if(clock === 0){
      setFinished(true)
    } else {
      setFinished(false)
    }
    let timer = setTimeout(() => { if(clock>limit){setClock(clock-1)} }, 1000);  
    return () => {
        clearTimeout(timer)
    }
    }, 
  [clock, limit])


  // change time and start/restart button onClick
  function reset(){
    if(clock === limit && clock !== 0){
        setStartRestart("reset")
        setLimit(0)  
        setClock(clock - 1)       
    } else {
        setStartRestart("start")
        setClock(10)
        setLimit(10)    
      }
   }

  // define style for Pointer
  let pointerStyle = {
    top: pointerPos.y - 10 + "px", 
    left: pointerPos.x - 10 + "px", 
    color: pointerPos.color
  }
    // define pointer position on mouseMove
    function handleMouseMove(e){
      const x = e.clientX 
      const y = e.pageY
      setPointerPos({
        x, y
      })
    }
  

  return (
      <div  onMouseMove ={handleMouseMove} >
        <div className ="pointer" style ={pointerStyle}></div>
        <Countdown time = {clock} />
        <Canvas 
          ifStart = {startRestart} 
          ifFinished = {finished} 
          bgColor = {pointerPos.color}
          drawingTime = {limit}
        />
        <Start  
          ifStart = {startRestart} 
          onClick ={reset} 
        />
      </div>
  );
}

export default Draw;
