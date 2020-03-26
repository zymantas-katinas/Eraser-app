import React, {useState, useEffect, useRef} from 'react';
import Header from './components/Header'
import Gallery from './components/Gallery'
import Countdown from './components/Countdown'
import Canvas from './components/Canvas'
import Start from './components/Start'

function App() {

  const [clock, setClock] = useState(10)
  const [limit, setLimit] = useState(10)
  const [startRestart, setStartRestart] = useState("start")
  const [finished, setFinished] = useState(false)
  const [imgArr, setImgArr] = useState([])
  const [post, setPost] = useState(true)
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
  [clock])

  function handleMouseMove(e){
    const x = e.clientX 
    const y = e.pageY
    setPointerPos({
      x, y
    })
  }

  function reset(){
      if(clock === limit && clock !== 0){
           setStartRestart("reset")
           setLimit(0)  
           setClock(clock - 1)    
           
      } else {
          setStartRestart("start")
          setClock(10)
          setLimit(10)    
          // clearRect(0, 0, 400, 400);

       }
      //  console.log(btn)
   }
   // update post state when clicked to initiate useEffect in canvas to push img
  function postClick(){
    // console.log('post')
    setPost((post) => !post)
  }

  // get imgArr from canvas
  function getArr(prop){
    setImgArr(prop)
  }
  // put every img from imgArr to <div><img></div>
  const allImg = imgArr.map(item => <div key ={item.id}><img src={item.src} /><p>{item.title}</p></div>);
  let pointerStyle = {top: pointerPos.y - 10, left: pointerPos.x - 10 }

  // const buttons = document.querySelectorAll(".countdown button")
  // buttons.onMouseOver = function(){ console.log('btn') }
  function handleBtnMouseOver(){
    console.log('over')
  }

  return (
    <div onMouseMove ={handleMouseMove} >
      <div className ="pointer" style ={pointerStyle}></div>
      <Header />
      <Countdown time = {clock} clickPost = {postClick}/>
      <Canvas ifStart = {startRestart} ifFinished = {finished} getArr = {getArr} onPostClick ={post} />
      <Start  ifStart = {startRestart} onClick ={reset} onMouseOver = {handleBtnMouseOver}/>
      <Gallery allImg = {allImg}/>
    </div>
  );
}

export default App;
