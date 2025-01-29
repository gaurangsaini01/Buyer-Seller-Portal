import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import OpenRoute from './components/Auth/OpenRoute'
import AuthTemplate from './pages/AuthTemplate'
import PrivateRoute from './components/Auth/PrivateRoute'
import Items from './pages/Items'
import Orders from './pages/Orders'
import Deliver from './pages/Deliver'
import Profile from './pages/Profile'

function App() {
  return (
    <Routes>
      <Route path="/" element={<OpenRoute><AuthTemplate type={"login"} /></OpenRoute>}></Route>
      <Route path="/signup" element={<OpenRoute><AuthTemplate type={"signup"} /></OpenRoute>}></Route>
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
        <Route path='/dashboard/my-profile' element={<PrivateRoute><Profile /></PrivateRoute>}></Route>
        <Route path='/dashboard/items' element={<PrivateRoute><Items /></PrivateRoute>}></Route>
        <Route path='/dashboard/orders' element={<PrivateRoute><Orders /></PrivateRoute>}></Route>
        <Route path='/dashboard/deliver' element={<PrivateRoute><Deliver /></PrivateRoute>}></Route>
      </Route>
    </Routes>
  )
}

export default App