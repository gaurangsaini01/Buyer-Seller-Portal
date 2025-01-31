import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { filterRoutes } from '../../data';

function Filter() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className='w-full overflow-hidden'>
            <div className="flex gap-4  rounded-md items-center">
                {filterRoutes.map((route) => (
                    <div
                        key={route.path}
                        onClick={() => navigate(route.path)}
                        className={`cursor-pointer px-4 py-2 ${location.pathname === route.path ? 'text-white rounded-md bg-black  font-medium' : ''}`}
                    >
                        {route.label}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Filter