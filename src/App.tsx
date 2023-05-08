import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import './App.css';


function App() {
   const [number, setNumber] = useState(0)
   const [data, setData] = useState(new Date())
   const [start, setStart] = useState(false)


   let actualTime = data.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hourCycle: 'h23',
      minute: 'numeric',
      second: 'numeric',
      weekday: 'long',
      day: 'numeric',
      year: 'numeric'
   })


   useEffect(() => {
      const intervalID = setInterval(() => {
         if (number < 0) return
         setData(new Date(data.setSeconds(data.getSeconds() + 1)))

      }, 1000)
      return () => {
         clearInterval(intervalID)

      }
   }, [data])


   const onClickHandlerStart = () => {
      setData(new Date(number * 1000))
      setStart(true)
   }
   const onClickHandlerStop = () => {
      setNumber(0)
      setStart(false)
   }
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      e.currentTarget.value = e.currentTarget.value.replace(/[A-Za-zа-яА-Я]/g, '')
      setNumber(+e.currentTarget.value)
   }
   const onKeyDownHandle = (e: KeyboardEvent<HTMLInputElement>) => {
      e && e.key === 'Enter' && onClickHandlerStart()
   }


   return (
      <div className="App">
         <div style={{marginBottom: '10px'}}>
            <input value={number}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandle}
                   placeholder="Seconds"/>

            <button onClick={onClickHandlerStart}>Start</button>
            <button onClick={onClickHandlerStop}>Stop</button>

         </div>

         <div>
            {
               start
                  ? <span>{actualTime}</span>
                  : <span>h : m : s </span>
            }
         </div>
      </div>
   );
}

export default App;
