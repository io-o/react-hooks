import React, {useCallback, useState, useEffect, useRef, memo} from 'react'
import './index.css'



const TodoItem = memo(
  function (props) {
    const { 
      todo: {
        id,
        text,
        complete
      }, 
      removeaTodo, 
      toggleTodo 
    } = props
    
    const onChange = () => {
      toggleTodo(id)
    }
  
    const onRemove = () => {
      removeaTodo(id)
    }
  
  
    return (
      <li className="todo-item">
        <input 
          type="checkbox"
          checked={complete}
          onChange={onChange}
          />
        <label className={complete ? 'complete' : ''}>{text}</label>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={onRemove}>删除</button>
      </li>
    )
    
  }
)  

const Todo = memo(
  function (props) {
    const { todos,removeaTodo,toggleTodo} = props
  
    return ( 
      <ul className="todo">
        {
          todos.map(item => {
            return (
              <TodoItem 
                key={item.id}
                todo={item}
                removeaTodo={removeaTodo}
                toggleTodo={toggleTodo}
              />
            )
          })
        }
      </ul>
    )
  }
)

const Control = memo(
  function (props) {
    const { addTodo } = props
    const inputRef = useRef()
    const idseq = Date.now()
    
    const onsubmit = (e) => {
      e.preventDefault()
      const newText = inputRef.current.value.trim()
  
      if (newText.length === 0) { return }
  
      addTodo({
        id: +idseq,
        text: newText,
        complete: false
      })
      inputRef.current.value = ''
    }
  
  
    return (
      <div className="control">
        <h1>To Do</h1>
        <form  onSubmit={onsubmit}>
          <input 
            ref={inputRef}
            type="text"
            placeholder="what is your problem?"
          />
        </form>
      </div>
    )
  }
)




function TodoList() {
  const [todos, setTodos] = useState([])

  // 需要向子组件传递 使用 usecallback
  const addTodo = useCallback((todo) => {
    setTodos(todos => [...todos, todo])
  }, [])

  const removeaTodo = useCallback((id) => {
    setTodos(todos => todos.filter(todo => {
      return todo.id !== id
    }))
  }, [])

  const toggleTodo = useCallback((id) => {
    setTodos(todos => todos.map(todo => {
      return todo.id === id
        ? {...todo, complete: !todo.complete }
        : todo
     }))
  }, [])

  // 要注意 useEffect 的顺序  
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('TO_DO') || [])
    setTodos(todos)
  }, [])

  useEffect(() => {
    localStorage.setItem('TO_DO', JSON.stringify(todos))
  }, [todos])




  return (
    <div className="todo-list">
      <Control 
        addTodo={addTodo}
      />

      <Todo 
        removeaTodo={removeaTodo}
        toggleTodo={toggleTodo}
        todos={todos}
      />
    </div>
  )
}

export default TodoList 