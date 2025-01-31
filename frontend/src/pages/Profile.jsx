import React, { useEffect, useState } from 'react'
import { getProfileData, updateProfile } from '../services/operations/profile'
import { useSelector } from 'react-redux';
function Profile() {
    const { token } = useSelector((state) => state.auth)

    const [data, setData] = useState({});

    async function handleUpdate(e) {
        e.preventDefault();
        console.log(data)
        const res = await updateProfile(data, token);
        if (res) {
            setData(res);
        }
    }
    function handleChange(e) {
        setData(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    useEffect(() => {
        async function getData() {
            const res = await getProfileData(token)
            setData(res);
        }
        getData();
    }, [])

    return (
        <div>
            <h1 className='text-3xl font-bold text-center'>User Details</h1>
            <form onSubmit={handleUpdate} className='items-center flex flex-col gap-6 mt-12'>
                <div className='flex gap-2 w-full'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="firstName">FirstName</label>
                        <input autoComplete='off' className='inputEdit' type="text" value={data?.firstName || ""} name='firstName' onChange={handleChange} />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="lastName">LastName</label>
                        <input autoComplete='off' className='inputEdit' type="text" value={data?.lastName || ""} name='lastName' onChange={handleChange} />
                    </div>
                </div>
                <div className='flex gap-2 w-full'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="age">Age</label>
                        <input autoComplete='off' placeholder='Enter age' className='inputEdit w-full' type="number" value={data?.age || ""} name='age' onChange={handleChange} />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="gender">Gender</label>
                        {/* <input autoComplete='off' className='inputEdit' type="text" placeholder='Male, Female ,Other' value={data?.gender} name='gender' onChange={handleChange} /> */}
                        <select className='py-2 border-[1px] w-[85%] outline-0' value={data?.gender || ""} onChange={handleChange} name="gender" id="gender">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
                <div className='flex gap-2 w-full'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="contactNumber">Contact Number</label>
                        <input autoComplete='off' placeholder='Enter contact Number' className='inputEdit w-full' type="number" value={data?.contactNumber || ""} name='contactNumber' onChange={handleChange} />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="about">About</label>
                        <input autoComplete='off' className='inputEdit' type="text" placeholder='Enter about yourself' value={data?.about || ""} name='about' onChange={handleChange} />
                    </div>
                </div>
                <button type="submit" className='px-6 py-2 rounded-md border-[1px] bg-black/75 text-white/80 cursor-pointer hover:scale-95 transition-all duration-150 ease-in-out mt-12'>Update Profile</button>
            </form>

        </div>
    )
}

export default Profile