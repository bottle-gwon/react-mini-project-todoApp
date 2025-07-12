import { useEffect, useRef, useState } from "react";
import formatTime from "./formatTime";

const StopWatch = ( {time, setTime}) =>{
  const [isOn, setIsOn] = useState(false);
  const timerRef = useRef(null)

  useEffect(()=> {
    if(isOn === true){
      const timerId = setInterval(() => {
        setTime((prev) => prev +1)
      }, 1000);
      timerRef.current = timerId;
    }else{
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  },[isOn])

  return (
    <>
      <div>
        {formatTime(time)}
        <button onClick={()=> setIsOn((prev)=> !prev)}>{isOn ? "끄기": "켜기"}</button>
        <button onClick={()=>{
          setTime(0);
          setIsOn(false);
        }}>리셋</button>
      </div>
    </>
  )
}

export default StopWatch