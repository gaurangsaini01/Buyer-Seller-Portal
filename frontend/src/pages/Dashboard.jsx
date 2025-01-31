import React from 'react'
import Navbar from '../components/General/Navbar'
import { Outlet } from 'react-router-dom'

function Dashboard() {
    return (
        <div>
            <Navbar />
            <div className='p-6'>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard