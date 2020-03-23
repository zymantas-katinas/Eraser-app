import React, {useState, useEffect} from 'react'

function Countdown(){
    const [clock, setClock] = useState(10)
    const [limit, setLimit] = useState(10)
    // const [startTime, setStartTime] = useState(10)
    const [stopResume, setStopResume] = useState("stop")
    const [startRestart, setStartRestart] = useState("start")



    // let startTime = 10

    useEffect(() => {   
        let timer = setTimeout(() => { if(clock>limit){setClock(clock-1)} }, 1000);  
        return () => {
            clearTimeout(timer)
        }
        }, 
    [clock])

    // useEffect(() => {
    //     if(clock === limit){
    //         setStartRestart("start")
    //     } else {
    //         setStartRestart("restart")
    //     }
    // },[clock])

    function restart(){
        if(clock == limit){
             setStartRestart("reset")
             setLimit(0)  
             setClock(clock - 1)    
        } else {
            setStartRestart("start")
            setClock(10)
            setLimit(10)           
         }
     }

    function stop(){
        if(stopResume === "stop"){
            setStopResume("resume"); 
            setLimit(clock)
            // setClock(clock)         
        }
         else{
            setStopResume("stop")
            setLimit(0)
            setClock(clock - 1)
         }  
    }

    return (
        <div className = "countdown">
            <button onClick = {restart}> {startRestart}</button>
            <h1>{clock}s</h1>
    <button onClick = {stop} style ={{display: clock === limit ? "none" : "inline-block"}}> {stopResume}</button>
        </div>
        
    )
}
export default Countdown