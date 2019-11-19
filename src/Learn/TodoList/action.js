export function createSet (payload) {
  return {
    type: 'set',
    payload
  }
}

export function createRemove (payload) {
  return {
    type: 'remove',
    payload
  }
}

// 异步action
// export function createAdd (payload) {
//   return (dispatch, state) => {
//     const { todos } = state
//     console.log(todos);
    
//     if (!todos.find(todo => todo.text === payload.text)) {
//       dispatch({
//         type: 'add',
//         payload
//       })
//     }

//   }
// }

export function createAdd (payload) {
  return {
    type: 'add',
    payload
  }
}

export function createToggle (payload) {
  return {
    type: 'toggle',
    payload
  }
}