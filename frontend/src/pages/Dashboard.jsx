import React from 'react'
import Navbar from '../components/General/Navbar'
import { Outlet } from 'react-router-dom'

function Dashboard() {
    return (
        <div>
            <div className='fixed w-full bg-white z-20'>
                <Navbar />
            </div>
            <div className='p-6 pt-20'>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard