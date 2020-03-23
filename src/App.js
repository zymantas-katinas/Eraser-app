import React, {useState, useEffect} from 'react';
import Header from './components/Header'
import Countdown from './components/Countdown'
import Canvas from './components/Canvas'
import Start from './components/Start'

function App() {

  const [startRestart, setStartRestart] = useState("reset")

  function reset(){
    if(startRestart === "start"){
         setStartRestart("reset")
        //  setLimit(0)  
        //  setClock(clock - 1)    
    } else {
        setStartRestart("start")
        // setClock(10)
        // setLimit(10)           
     }
 }



  return (
    <div >
      <Header />
      <Countdown />
      <Canvas />
      <Start title = {startRestart} onClick ={reset}/>
    </div>
  );
}

export default App;
