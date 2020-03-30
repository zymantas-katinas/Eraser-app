import React, {useState, useEffect, useRef} from 'react';
import Nav from './components/Nav';
import Header from './components/Header';
import Gallery from './components/Gallery';
import Countdown from './components/Countdown';
import Canvas from './components/Canvas';
import Start from './components/Start';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
 
function App() {

  const [clock, setClock] = useState(10)
  const [limit, setLimit] = useState(10)
  const [startRestart, setStartRestart] = useState("start")
  const [finished, setFinished] = useState(false)
  const [imgArr, setImgArr] = useState([])
  const [post, setPost] = useState(true)
  const [pointerPos, setPointerPos] = useState([{x: 0, y: 0}])

  //

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

  // define pointer position on mouseMove
  function handleMouseMove(e){
    const x = e.clientX 
    const y = e.pageY
    setPointerPos({
      x, y
    })
  }

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
   // update post state when clicked to initiate useEffect in canvas to push img
  function postClick(){
    setPost((post) => !post)
  }

  // get imgArr from canvas
  function getArr(prop){
    setImgArr(prop)
  }
  // put every img from imgArr to <div><img></div>
  const allImg = imgArr.map(item => <div key ={item.id}><img src={item.src} alt="artpiece" /><p>{item.title}</p></div>);

  // define style for Pointer
  let pointerStyle = {
    top: pointerPos.y - 10 + "px", 
    left: pointerPos.x - 10 + "px", 
    color: pointerPos.color
  }

  return (
    <Router>
      <div  onMouseMove ={handleMouseMove} className = "app" >
        <div className ="pointer" style ={pointerStyle}></div>
        <Nav />
        <Header />
        <Countdown
          time = {clock} 
          clickPost = {postClick}
        />
        <Canvas 
          ifStart = {startRestart} 
          ifFinished = {finished} 
          getArr = {getArr} 
          onPostClick ={post} 
          bgColor = {pointerPos.color}
        />
        <Start  
          ifStart = {startRestart} 
          onClick ={reset} 
        />
        {/* <Route path="/gallery" component= {Gallery} /> */}
        <Gallery 
          allImg = {allImg}
        />
      </div>
    </Router>
  );
}

export default App;
