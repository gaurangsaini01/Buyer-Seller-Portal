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
import AddItem from './pages/AddItem'
import ItemDetails from './pages/ItemDetails'
import Cart from './pages/Cart'
import PendingBuy from './components/Order/PendingBuy'
import PreviousBought from './components/Order/PreviousBought'
import PreviousSold from './components/Order/PreviousSold'
import Error from './pages/Error'

function App() {

  return (
    <Routes>
      <Route path="/" element={<OpenRoute><AuthTemplate type={"login"} /></OpenRoute>}></Route>
      <Route path="/signup" element={<OpenRoute><AuthTemplate type={"signup"} /></OpenRoute>}></Route>
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
        <Route path='/dashboard/my-profile' element={<PrivateRoute><Profile /></PrivateRoute>}></Route>
        <Route path='/dashboard/items' element={<PrivateRoute><Items /></PrivateRoute>}></Route>
        <Route path='/dashboard/items/:id' element={<PrivateRoute><ItemDetails /></PrivateRoute>}></Route>
        <Route path='/dashboard/orders' element={<PrivateRoute><Orders /></PrivateRoute>}>
          <Route path='pending-buy-orders' element={<PrivateRoute><PendingBuy /></PrivateRoute>}></Route>
          <Route path='previously-bought-items' element={<PrivateRoute><PreviousBought /></PrivateRoute>}></Route>
          <Route path='previously-sold-items' element={<PrivateRoute><PreviousSold /></PrivateRoute>}></Route>
        </Route>
        <Route path='/dashboard/deliver' element={<PrivateRoute><Deliver /></PrivateRoute>}></Route>
        <Route path='/dashboard/cart' element={<PrivateRoute><Cart /></PrivateRoute>}></Route>
        <Route path='/dashboard/add-item' element={<PrivateRoute><AddItem /></PrivateRoute>}></Route>
      </Route>
      <Route path='*' element={<Error />}></Route>
    </Routes>
  )
}

export default App