import React, {useState, useEffect} from 'react'

function Countdown(){
    const [clock, setClock] = useState(10)
    const [limit, setLimit] = useState(10)
    // const [startTime, setStartTime] = useState(10)
    // const [stopResume, setStopResume] = useState("resume")
    const [startRestart, setStartRestart] = useState("start")
    // let startTime = 10

    useEffect(() => {   
 
        let timer = setTimeout(() => { if(clock>limit){setClock(clock-1)} }, 1000);  
        return () => {
            clearTimeout(timer)
        }
        }, 
    [clock])
    function restart(){
        if(clock == limit && clock != 0){
             setStartRestart("reset")
             setLimit(0)  
             setClock(clock - 1)    
        } else {
            setStartRestart("start")
            setClock(10)
            setLimit(10)           
         }
     }
    return (
        <div className = "countdown">
            <button onClick = {restart}> {startRestart}</button>
            {clock != 0 ? <h1>{clock}s</h1> : <button>post</button>}
        </div>
        
    )
}
export default Countdown