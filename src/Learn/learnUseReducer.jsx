import React, {useReducer} from 'react'

function countReducer (state, action) {
  
  switch (action.type) {
    case 'add' :
      return state + 1
    case 'minus' :
      return state - 1
    default :
      return state
  }
}

function MyCount () {
  const [ count, dispatchCount ] = useReducer(countReducer, 0)

  


  return (
    <div>
      <h1>{count}</h1>
      <button onClick={_ => dispatchCount({type: 'add'})}>add</button>
      <button onClick={_ => dispatchCount({type: 'minus'})}>minus</button>
    </div>
  )
}

export default MyCount