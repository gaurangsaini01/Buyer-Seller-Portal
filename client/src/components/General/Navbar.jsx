import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUser } from '../../redux/slices/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import navbarLinks from '../../data';
import { getProfileData } from '../../services/operations/profile';
function Navbar() {
    const { token } = useSelector((state) => state.auth)
    const [data, setData] = useState({})
    useEffect(() => {
        async function getData() {
            const res = await getProfileData(token)
            setData(res);
        }
        getData();
    }, [])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [isActive, setIsActive] = useState(3);
    function handleLogout() {
        dispatch(setToken(null));
        // dispatch(setUser(null));
        navigate('/');
    }
    return (
        <div className='flex items-center bg-whitedark-bg-[#25262b] dark:text-[#f9f9f9] justify-between lg:px-6 lg:py-4 px-2 py-2'>
            <div className='lg:text-xl text-md font-semibold'>Welcome back, <span className='capitalize'>{data?.firstName}</span> 👋</div>
            <div className='flex items-center gap-6'>
                {navbarLinks.map((item) => (
                    <NavLink
                        key={item.id}
                        onClick={() => setIsActive(item.id)}
                        to={`${import.meta.env.VITE_APP_FRONTEND_URL}${item.link}`}
                        className={isActive === item.id
                            ? "text-yellow-500 font-bold border-b-2 border-yellow-500"
                            : "text-gray-500"
                        }
                    >
                        <p>{item.name}</p>
                    </NavLink>
                ))}
            </div>
            <div className='relative rounded-full w-10'>
                <img onClick={() => setShowMenu(prev => !prev)} src={data?.dp} className='w-full h-full rounded-full' alt="dp" />
                {showMenu && <div className='absolute top-12 right-0 p-2 w-[80px] h-[40px]  opacity-100 bg-[#2e2e2e] text-[#f0f0f0] rounded-sm'>
                    <button onClick={() => handleLogout()}>Logout</button>
                </div>}
            </div>
        </div>
    )
}

export default Navbar