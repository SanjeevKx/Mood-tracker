import React from 'react'
import Main from './Main'
import Status from './Status'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
    <Route path="/" element={<Main/>}/>
    <Route path="/status" element={<Status/>}/>

  </Routes>
  )
}

export default App