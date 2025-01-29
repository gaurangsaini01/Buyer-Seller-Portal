import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getItemData } from '../services/operations/item';
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { addToCart } from '../services/operations/cart';

function ItemDetails() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState({})
    const navigate = useNavigate();
    const { id } = useParams();
    const { token } = useSelector(state => state.auth)

   async function handleAddToCart(id) {
        const res = await addToCart(id,token,dispatch);
    }

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const res = await getItemData(id, token);
            if (res) {
                setItem(res);
                setLoading(false);
            }
        }
        getData();
    }, [])

    return (
        <>
            {loading && <div className='h-screen w-full flex items-center justify-center'> <div className=" loader"></div></div>}
            {!loading && <div className='flex'>
                <div className='w-1/2'>
                    <button className=' cursor-pointer px-6 py-2 rounded-md mb-6 bg-black text-white' onClick={() => navigate('/dashboard/items')}>Back</button>
                    <div className='overflow-hidden w-[90%] h-[450px]'>
                        <img className='w-full h-full object-cover' src={`${import.meta.env.VITE_APP_BACKEND_URL}/${item.image}`} alt="" />
                    </div>

                </div>
                <div className='pt-14'>
                    <div>
                        <h1 className='text-4xl font-bold'>{item?.itemName}</h1>
                        <p className='text-2xl'>{item?.description}</p>
                    </div>
                    <div className='space-y-2 mt-4'>
                        <p className='font-bold text-3xl flex items-center'><MdOutlineCurrencyRupee />{item?.price}</p>
                        <p className='text-xl'>Category: <span className='text-[#00000090]'>"{item?.category}"</span></p>
                        <p className='text-xl'>Seller : <span className='text-[#00000090]'>{item?.sellerId?.firstName}</span></p>
                    </div>
                    <div className='space-x-4 mt-6'>
                        <button onClick={() => handleAddToCart(item._id)} className=' transition-all ease-in-out duration-150 hover:scale-95 cursor-pointer px-6 py-2 rounded-md bg-white/80 text-black border  border-black'>Add To Cart</button>
                        <button className=' transition-all ease-in-out duration-150 hover:scale-95 cursor-pointer px-6 py-2 rounded-md bg-black text-white/80'>Buy now</button>
                    </div>
                </div>
            </div>}
        </>

    )
}

export default ItemDetails