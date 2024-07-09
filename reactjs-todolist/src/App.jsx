import { useEffect, useState } from "react"
import TodoInput from "./components/TodoInput"
import TodoLost from "./components/TodoLost"

function App() {
 
const [todos,setTodos]= useState([])
const[todoValue,setTodoValue]=useState()

function persisitData(newList){
  localStorage.setItem('todos',JSON.stringify({todos:newList}))
}

function handleAddTodos(newTodo){
  const newTodoList = [...todos, newTodo];
  persisitData(newTodoList)
  setTodos(newTodoList)
}


function handleDeleteTodo(index){
  const newTodoList = todos.filter((todo,todoIndex)=>{
    return todoIndex !==index
  })
  setTodos(newTodoList)
  persisitData(newTodoList)
}

function handleEditTodo(index){
    const valueTobeEdited = todos[index]
    setTodoValue(valueTobeEdited)
    handleDeleteTodo(index)
    persisitData(newTodoList)
}

useEffect(()=>{
  if(!localStorage){
    return
  }
  let localTodos = localStorage.getItem('todos')
  if(!localTodos){
    return
  }

  localTodos=JSON.parse(localTodos).todos
  setTodos(localTodos)
},[])

  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
      <TodoLost handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos}/>
      
    </>
  )
}

export default App
