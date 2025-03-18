import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getPendingBuyOrders } from '../../services/operations/order';
import { MdOutlineCurrencyRupee } from 'react-icons/md';

function PendingBuy() {
    const [orders, setOrders] = useState([]);
    const { token } = useSelector(state => state.auth)
    useEffect(() => {
        async function getPendingOrders() {
            const res = await getPendingBuyOrders(token);
            console.log(res)
            if (res) {
                setOrders(res);
            }
        }
        getPendingOrders();
    }, [])

    return (
        <div className='flex flex-col gap-4 mt-4'>
            {orders.length > 0 ? (
                orders.map((order) => {
                    return (
                        <div key={order._id}>
                            <div className='flex bg-black/10 p-4 rounded-md gap-10'>
                                <div className='w-[200px] rounded-md overflow-hidden'>
                                    <img
                                        className='w-full object-cover h-full'
                                        src={`${import.meta.env.VITE_APP_BACKEND_URL}/${order.itemId.image[0]}`}
                                        alt=""
                                    />
                                </div>
                                <div className=''>
                                    <div className='flex gap-4 items-center'>
                                        <div className='text-4xl font-bold'>
                                            {order.itemId.itemName}
                                        </div>
                                        <div className='text-4xl font-extralight'>
                                            (Seller : {order.sellerId.firstName})
                                        </div>
                                    </div>
                                    <div className='text-2xl text-[#00000090]'>
                                        {order.itemId.description}
                                    </div>
                                    <div className='flex gap-10 w-full items-center '>
                                        <div className='text-5xl font-bold flex items-center'>
                                            <div>
                                                <MdOutlineCurrencyRupee size={50} />
                                            </div>
                                            <div>{order.itemId.price}</div>
                                        </div>
                                        <div className='font-bold text-3xl'>
                                            (OTP: {order.otp})
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div>No pending orders available.</div> // Fallback message
            )}
        </div>
    );
    
}

export default PendingBuy