import { useEffect, useReducer, useRef, useState } from 'react'
import './App.css'
import search from './components/search.jsx';
// const STOARAGE = `http://localhost:3000/todo`;

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    case "READ_TODO":
      return state;
    case "UPDATE_TODO":
      return state.map((el) => 
        el.id === action.payload.id ?
        action.payload:
        el
      );
    case "DELETE_TODO":
      return state.filter((el) => el.id !== action.payload.id);
    default:
      return state;
  }
}


function App() {
  const [data, setData] = useState([]);
  const [todo, dispatch] = useReducer(todoReducer,[]);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [time, setTime] = useState(0);
  const [isTimer, setIsTimer] = useState(false);
  const [filtered ,setFiltered] = useState([]);

  
  useEffect(() =>{
    
    if(currentTodo){

      const todos = JSON.parse(window.localStorage.getItem("todos"));
        if (todos){
          const callTodo  = todos.find((el) => 
            el.id === currentTodo
          );
          const newTodo = {...callTodo, time: callTodo.time +1}
          console.log(newTodo);
          const checkedTodo = todos.map((el) => 
            el.id === newTodo.id ? newTodo : el
          )

          window.localStorage.setItem("todos", JSON.stringify(checkedTodo));
          dispatch({type : "UPDATE_TODO", payload:{...newTodo}})
        }
    }
  }, [time])

  useEffect(()=>{
    setTime(0);
  },[isTimer])

  useEffect(()=>{
    setData(JSON.parse(window.localStorage.getItem("todos"))||[]) 
  } ,[])
  
  useEffect(() =>{
    if(todo){
      todo.map((el)=>{ 
        dispatch({type:"DELETE_TODO", payload: {id: el.id}})
      })
    }
    if (data) {
      console.log(data);
      data.map((el)=>{
        dispatch({type: "ADD_TODO", 
        payload:{...el}
      })
      }
    )
    };
  }, [data])

  return (
    <>
      <h1>TODO LIST</h1>
      <Clock />
      <Advice />
      <button onClick={() => setIsTimer(prev => !prev)}>
        {isTimer ? '스톱워치로 변경' : '타이머로 변경'}
      </button>
      {isTimer ? (
      <Timer time={time} setTime={setTime}/>

      ) : (
      <StopWatch time={time} setTime={setTime} />

      )}
      
      <TodoList todo={todo} dispatch={dispatch} 
      currentTodo = {currentTodo}
      setCurrentTodo={setCurrentTodo}
      />
      <TodoInput dispatch={dispatch} />
    </>
  )
}


const TodoInput = ( {dispatch} ) =>{
  const inputRef = useRef(null);
  const addTodo = () =>{
    const newTodo={
      id : new Date(),
      content: inputRef.current.value,
      time: 0,
      completed: false,
    };
    const todos = JSON.parse(window.localStorage.getItem("todos")) || [];

    window.localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
    dispatch({type: "ADD_TODO", payload: newTodo})
    inputRef.current.value = "";
  }
  
  return(
    <>
      <input ref ={inputRef} />
      <button onClick={addTodo}>추가</button>
    </>
  )
  
}



const TodoList = ({ todo, dispatch, setCurrentTodo, currentTodo }) =>{
  return(
    <ul>
      {todo.map((el) => 
        (
        <Todo 
        key={el.id} 
        todo = {el} 
        dispatch={dispatch} 
        currentTodo = {currentTodo}
        setCurrentTodo={setCurrentTodo}
        />
      )
      )}
    </ul>

  );
};

const Todo = ({todo, dispatch, currentTodo, setCurrentTodo}) =>{
  return (
    <li className={
      currentTodo === todo.id ? 'current':''}>
      <div>
        <input type="checkbox"
        checked={todo.completed}
        // checked={false}
        onChange={(check)=>{
          console.log(check.target.checked)
          const todos = JSON.parse(window.localStorage.getItem("todos"));
          if (todos){
            const newTodo = {...todo, completed: !todo.completed}
            const checkedTodo = todos.map((el) => 
              el.id === todo.id ? newTodo : el
            )
            window.localStorage.setItem("todos", JSON.stringify(checkedTodo));
            dispatch({type : "UPDATE_TODO", payload:{...newTodo}})
          }
        }}
        />
        {todo.content} 
        <br/>
        {formatTime(todo.time)}
      </div>
      <div>
      <button
        onClick={() => setCurrentTodo(todo.id)}
      >시작하기</button>
      <button onClick={ ()=>{
        const todos = JSON.parse(window.localStorage.getItem("todos"));
        if(todos){
          const newTodo  = todos.filter(el => el.id !== todo.id);
          window.localStorage.setItem("todos", JSON.stringify(newTodo));
          dispatch({type: "DELETE_TODO", payload:{id:todo.id}})
        }
      }}>삭제</button>
      </div>
    </li>
  )
}




const useFetch = (url) =>{
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

    useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          setData(res)
          setIsLoading(false)
        });
      
    }, [url]);
  return [isLoading, data]
}


const Advice = () =>{
  const [isLoading, data] = 
  useFetch("https://korean-advice-open-api.vercel.app/api/advice")
  return <>
    {data && (
      <>
        <div className='advice'>{data.message}</div>
        <div className='advice'>-{data.author}-</div>
      </>
    )}
  </>
}

const Clock = () =>{
  const[time, setTime] = useState(new Date());

  useEffect(()=>{
    setInterval(()=>{
      setTime(new Date())
    }, 1000)
  }, [])
  return <div className='clock'>{time.toLocaleTimeString()}</div>
}

/**
 * 
 * @param {Number} seconds 
 * @returns format hh:mm:ss
 */
const formatTime = (seconds) =>{
  const timeString = `${
    String(Math.floor(seconds / 3600)).padStart(2,"0")
  }:${
    String(Math.floor((seconds % 3600) / 60)).padStart(2,"0")
  }:${
    String(seconds % 60).padStart(2,"0")
  }`;
  return timeString;
}

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


const Timer = ({time, setTime}) => {
  const [startTime, setStartTime] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isOn && time > 0){
      const timerId = setInterval(() => {
        setTime((prev) => prev - 1)
      },1000)
      timerRef.current = timerId; 
    }
    else if(!isOn || time == 0){
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current)

  } , [isOn, time])

  return (
    <div>
      <div>
        {time ? formatTime(time) : formatTime(startTime)}
        <button onClick={()=>{
          setIsOn(true)
          setTime(time ? time : startTime)
          setStartTime(0);
          }}>시작</button>
        <button onClick={()=>setIsOn(false)}>멈춤</button>
        <button 
          onClick={() => {
            setTime(0);
            setIsOn(false);
          }}
          >
            리셋
          </button>
      </div>
      <input 
      type="range" 
      value={startTime} 
      min= '0'
      max='3600'
      step='30'
      onChange={(event)=>setStartTime(event.target.value)} 
      />
    </div>
  )
}


export default App