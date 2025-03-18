import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineCurrencyRupee } from "react-icons/md";

function ItemCard({ item }) {
    const navigate = useNavigate();
    console.log(item)
    return (
        <div onClick={() => navigate(`/dashboard/items/${item._id}`)} className='w-[320px] hover:scale-95 transition-all duration-150 ease-in-out hover:cursor-pointer p-4 flex flex-col min-h-[350px] rounded-md bg-blue-100/50'>
            <div className='h-[200px] overflow-hidden rounded-md'>
                <img className='w-full object-cover h-full' src={`${import.meta.env.VITE_APP_BACKEND_URL}/${item.image[0]}`} alt="Item Image" />
            </div>
            <div className='mt-4 space-y-1'>
                <div className='text-2xl font-medium'>{item.itemName}</div>
                <div className='text-sm text-[#00000080]'>{item.description}</div>
                <div className='text-2xl flex items-center font-semibold'><MdOutlineCurrencyRupee />{item.price}</div>
                <div className='text-sm font-semibold'>Category : <span className='text-sm font-medium text-[#00000080]'>{item.category}</span></div>
            </div>
        </div>
    )
}

export default ItemCard