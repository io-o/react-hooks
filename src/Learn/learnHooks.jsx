import React, {useCallback, useState, useEffect} from 'react'

function useSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }, [])

  useEffect(() =>{
    window.addEventListener('resize', onResize, false)
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])
  return size
}

function Mycallbak () {
  const size = useSize()
  return (
    <div>
      <h1>{size.width}</h1>
    </div>
  )
}

export default Mycallbak