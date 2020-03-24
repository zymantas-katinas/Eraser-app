import React, {useState, useEffect} from 'react';
import Header from './components/Header'
import Countdown from './components/Countdown'
import Canvas from './components/Canvas'
import Start from './components/Start'

function App() {

  const [clock, setClock] = useState(10)
  const [limit, setLimit] = useState(10)
  const [startRestart, setStartRestart] = useState("start")

  useEffect(() => {   
      let timer = setTimeout(() => { if(clock>limit){setClock(clock-1)} }, 1000);  
      return () => {
          clearTimeout(timer)
      }
      }, 
  [clock])
  function reset(){
      if(clock == limit && clock != 0){
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

  return (
    <div >
      <Header />
      <Countdown time = {clock}/>
      <Canvas title = {startRestart} />
      <Start title = {startRestart} onClick ={reset}/>
    </div>
  );
}

export default App;
