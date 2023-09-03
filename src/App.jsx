import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HeaderMenu from './components/HeaderMenu'
import TestsPage from './components/pages/TestsPage'
import HomePage from './components/pages/HomePage'

function App() {
  return (
    <div className='flex flex-col items-center' >
      <HeaderMenu />
      <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route path="/tests" element={<TestsPage />} />
        <Route path="/" />
      </Routes>
    </div>
  )
}

export default App
