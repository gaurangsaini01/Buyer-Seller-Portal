import React from 'react'
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart } from '../services/operations/cart';
function CartItem({ item, setCartItems }) {
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.auth)
    async function handleDelete(id) {
        const res = await deleteFromCart(id, token, dispatch);
        console.log(res)
        if (res) {
            setCartItems(res);
        }
    }
    return (
        <div className='flex bg-black/10 p-4 rounded-md gap-10'>
            <div className='w-[200px] rounded-md overflow-hidden'>
                <img className='w-full object-cover h-full' src={`${import.meta.env.VITE_APP_BACKEND_URL}/${item.image[0]}`} alt="" />
            </div>
            <div className=''>
                <div className='text-4xl font-bold'>{item.itemName}</div>
                <div className='text-2xl text-[#00000090]'>{item.description}</div>
                <div className='flex  w-full items-center '>
                    <div className='text-5xl font-bold flex items-center'>
                        <div><MdOutlineCurrencyRupee size={50} /></div>
                        <div >{item.price}</div>
                    </div>
                    <div className='cursor-pointer'><RiDeleteBin3Line onClick={() => handleDelete(item._id)} size={40} /></div>
                </div>
            </div>
        </div>
    )
}

export default CartItem