import formatTime from "./formatTime";

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
        onChange={()=>{
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


export default TodoList;