import React, {useState, useEffect} from 'react';
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

  return (
    <div >
      <Header />
      <Gallery allImg = {allImg}/>
      <Countdown time = {clock} clickPost = {postClick}/>
      <Canvas ifStart = {startRestart} ifFinished = {finished} getArr = {getArr} onPostClick ={post} />
      <Start ifStart = {startRestart} onClick ={reset}/>
    </div>
  );
}

export default App;
