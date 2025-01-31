import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { operationLogin, operationSignup } from '../services/operations/auth';
import { useDispatch } from 'react-redux';
import { cycle } from '../assets'
function AuthTemplate({ type }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    async function handleLogin() {
        await operationLogin(formData, navigate, dispatch);
    }
    async function handleSignup() {
        await operationSignup(formData, navigate);
    }

    function changeHandler(e) {
        setFormData((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    useEffect(() => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        });
    }, [type])

    return (
        <div className='h-screen  w-full flex'>
            <div className={`${type == "login" ? 'w-[40%]' : 'w-[60%]'} md:w-[60%] w-full space-y-12 bg-white h-full ${type == "login" ? 'p-16' : 'p-12'}`}>
                <h1 className='text-xl text-[#3751FE] font-bold'>E-Commerce for IIIT</h1>
                <div className='space-y-6'>
                    <p className='text-3xl text-[#3751FE] font-bold'>Driving Tax Free Sales For The IIIT Community !</p>
                    <p className='text-[#00000099] font-medium'>Welcome back! Please {type == "login" ? 'login' : 'signup'} to your account.</p>
                    <form onSubmit={(e) => e.preventDefault()} className={` ${type == "login" ? 'space-y-5' : 'space-y-4'}`}>
                        {type && type == "signup" && <div className='flex items-center w-full'>
                            <div className='flex flex-col gap-2'>
                                <label className='text-sm ' htmlFor="firstName">First Name</label>
                                <input value={formData.firstName} name='firstName' onChange={changeHandler} className='inputClass' placeholder='Enter your FirstName' type="text" />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-sm ' htmlFor="lastName">Last Name</label>
                                <input value={formData.lastName} name='lastName' onChange={changeHandler} className='inputClass' placeholder='Enter your lastName' type="text" />
                            </div>
                        </div>}
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm ' htmlFor="email">Email Address</label>
                            <input value={formData.email} name='email' onChange={changeHandler} className='inputClass' placeholder='example@iiit.com' type="text" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm' htmlFor="password">Password</label>
                            <input value={formData.password} name='password' onChange={changeHandler} className='inputClass' placeholder='******' type="password" />
                        </div>
                        {
                            type && type == "signup" && <div className='flex flex-col gap-2'>
                                <label className='text-sm' htmlFor="confirmPassword">Confirm Password</label>
                                <input value={formData.confirmPassword} name='confirmPassword' onChange={changeHandler} className='inputClass' placeholder='******' type="password" />
                            </div>
                        }

                        <div>Don't have an account ? <span onClick={() => {
                            navigate(type == "login" ? '/signup' : '/')
                        }} className='text-[#3751FE] cursor-pointer underline italic'>{type == "login" ? 'signup' : 'login'}</span></div>


                        {type && type == "login" && <button onClick={() => handleLogin()} className='px-6 py-2 outline-0 border-[1px] mt-4 bg-[#3751FE] text-white hover:scale-95 transition-all duration-200 ease-in-out cursor-pointer'>Login</button>}
                        {type && type == "signup" && <button onClick={() => handleSignup()} className='px-6 py-2 outline-0 border-[1px] border-[#3751FE] text-[#3751FE] hover:scale-95 transition-all duration-200 ease-in-out cursor-pointer'>Signup</button>}
                    </form>
                </div>
            </div>
            <div className='w-full flex items-center bg-[#E5E5E569]'>
                <img src={cycle} className='' alt="" />
            </div>
        </div>
    )
}

export default AuthTemplate