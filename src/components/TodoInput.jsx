import { useRef } from "react";

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


export default TodoInput;