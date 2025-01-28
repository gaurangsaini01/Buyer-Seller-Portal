import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import OpenRoute from './components/Auth/OpenRoute'
import AuthTemplate from './pages/AuthTemplate'
import PrivateRoute from './components/Auth/PrivateRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<OpenRoute><AuthTemplate type={"login"} /></OpenRoute>}></Route>
      <Route path="/signup" element={<OpenRoute><AuthTemplate type={"signup"} /></OpenRoute>}></Route>
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route>
    </Routes>
  )
}

export default App