import React from 'react'
import Filter from '../components/Order/Filter';
import { Outlet } from 'react-router-dom';

function Orders() {
  return (
    <div className="w-full">
      <div>
        <Filter />
      </div>
      <Outlet />
    </div>
  )
}

export default Orders;