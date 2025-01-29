import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getItemData } from '../services/operations/item';

function ItemDetails() {
    const [item, setItem] = useState({})
    const navigate = useNavigate();
    const { id } = useParams(); //id is string
    const { token } = useSelector(state => state.auth)
    useEffect(() => {
        async function getData() {
            const res = await getItemData(id, token);
            if (res) {
                setItem(res);
            }
        }
        getData();
    }, [])
    console.log(item)
    return (
        <>

            <div className='flex'>
                <div> <button className=' cursor-pointer px-6 py-2 rounded-md mb-6 bg-black text-white' onClick={() => navigate('/dashboard/items')}>Back</button>
                    <div className='overflow-hidden w-[500px] h-[300px]'>
                        <img className='w-full h-full object-cover' src={`${import.meta.env.VITE_APP_BACKEND_URL}/${item.image}`} alt="" />
                    </div></div>
                <div>
                    <h1 className='text-4xl font-bold'>{item?.itemName}</h1>
                    <p>{item?.description}</p>
                    <p>{item?.price}</p>
                    <p>Category: {item.category}</p>
                    <p>Seller : {item?.sellerId?.firstName}</p>
                </div>
            </div>

        </>

    )
}

export default ItemDetails