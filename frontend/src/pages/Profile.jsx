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
        setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    useEffect(() => {
        async function getData() {
            const res = await getProfileData(token)
            setData(res);
        }
        getData();
    }, [])

    return (
        <div className="flex justify-center items-center mt-8 px-4">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">User Profile</h1>

                <form onSubmit={handleUpdate} className="space-y-6">

                    {/* First Name & Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-600 text-sm">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={data?.firstName || ""}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <label className="text-gray-600 text-sm">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={data?.lastName || ""}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    {/* Age & Gender */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-600 text-sm">Age</label>
                            <input
                                type="number"
                                name="age"
                                value={data?.age || ""}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter age"
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <label className="text-gray-600 text-sm">Gender</label>
                            <select
                                name="gender"
                                value={data?.gender || ""}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>

                    {/* Contact Number & About */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-600 text-sm">Contact Number</label>
                            <input
                                type="number"
                                name="contactNumber"
                                value={data?.contactNumber || ""}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter contact number"
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <label className="text-gray-600 text-sm">About</label>
                            <input
                                type="text"
                                name="about"
                                value={data?.about || ""}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Tell us about yourself"
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
                    >
                        Update Profile
                    </button>

                </form>
            </div>
        </div>
    );
}

export default Profile;
