import { useEffect, useReducer, useState } from 'react'
import './App.css'
import Filtered from './components/Search.jsx';
import TodoList from './components/TodoList.jsx';
import Advice from './components/advice.jsx';
import Timer from './components/timer.jsx';
import StopWatch from './components/StopWatch.jsx';
import Clock from './components/Clock.jsx';
import TodoInput from './components/TodoInput.jsx';
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
  const [stopWatch, setStopWatch] = useState(0);
  const [isTimer, setIsTimer] = useState(false);
  const [filtered ,setFiltered] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  
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
  }, [time, stopWatch])

  useEffect(()=>{
    setTime(0);
  },[isTimer])

  useEffect(()=>{
    setData(JSON.parse(window.localStorage.getItem("todos"))||[]) 
    setFiltered(data);
  } ,[])
  
  useEffect(() =>{
    if(todo){
      todo.map((el)=>{ 
        dispatch({type:"DELETE_TODO", payload: {id: el.id}})
      })
    }
    if (data && !isFilter) {
      data.map((el)=>{
        dispatch({type: "ADD_TODO", 
        payload:{...el}
      })
      }
    )
    }else if(data && isFilter){
      data.map((el)=>{
        dispatch({type: "ADD_TODO", 
        payload:{...el}
      })
      }
    )
    }
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
      <StopWatch time={stopWatch} setTime={setStopWatch} />

      )}
      <Filtered todo={todo} setFiltered={setFiltered} setIsFilter={setIsFilter} />
      <TodoList todo={todo} dispatch={dispatch} 
      currentTodo = {currentTodo}
      setCurrentTodo={setCurrentTodo}
      />
      <TodoInput dispatch={dispatch} />
    </>
  )
}












export default App