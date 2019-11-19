import React, {
  useCallback, 
  useState, 
  useEffect, 
  useRef, 
  memo
  } from 'react'
import { 
    createAdd, 
    createRemove, 
    createSet, 
    createToggle 
  } from './action'
import './index.css'


  function bindAction(actionCreators, dispatch) {
    const ret = {}
    for (let key in actionCreators) {
      ret[key] = function (...args) {

        const actionCreator = actionCreators[key]
        const action = actionCreator(...args)
        dispatch(action)
      }
    }



    return ret
  }



const TodoItem = memo(
  function (props) {
    const { 
      todo: {
        id,
        text,
        complete
      }, 
      dispatch 
    } = props
    
    
    const onChange = () => {
      dispatch(createToggle(id))
    }
  
    const onRemove = () => {
      dispatch(createRemove(id))
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
    const { dispatch,todos } = props
  
    return ( 
      <ul className="todo">
        {
          todos.map(item => {
            return (
              <TodoItem 
                key={item.id}
                todo={item}
                dispatch={dispatch}
                dispatch={dispatch}
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

  const dispatch = useCallback(
    (action) => {
      const { type, payload } = action
      switch(type) {
        case 'add':
          setTodos(todos => [...todos, payload])
          break;
        case 'toggle':
          setTodos(todos => todos.map(todo => {
            return todo.id === payload
              ? {...todo, complete: !todo.complete }
              : todo
            }))
          break;
        case 'remove':
          setTodos(todos => todos.filter(todo => {
            return todo.id !== payload
          }))
          break;
        case 'remove':
          break;
        default:
      }
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
        {
          ...bindAction({
            addTodo: createAdd
          }, dispatch)
        }
      />

      <Todo 
        dispatch={dispatch}
        dispatch={dispatch}
        todos={todos}
      />
    </div>
  )
}

export default TodoList 