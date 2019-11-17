import React, {createContext, useState, lazy, Suspense, useEffect} from 'react'

const TestContext = createContext()

// lazy 延时函数 优化组件渲染
const About = lazy(() => import(/* webpackChunkName: 'about' */'../About'))

function Middle () {
  return <Leaf/> 
}

function Leaf () {
  return (
    <TestContext.Consumer>
      { 
        test => <h1>{test}</h1>
      }
    </TestContext.Consumer>
  )

}

function LearnCreateContext() {

  return (
    <TestContext.Provider value={state}>
      <button onClick={() => setState(state-1)}> add</button>
      <Middle></Middle>
    </TestContext.Provider>
  )
}

export default LearnCreateContext