import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCartData } from '../services/operations/cart';
import CartItem from '../components/CartItem';
import { buyItemsFromCart } from '../services/operations/order';

function Cart() {
    const [cartItems, setCartItems] = useState([])
    const { totalPrice } = useSelector(state => state.cart)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.auth)

    async function handleBuy() {
       const res= await buyItemsFromCart(cartItems, token, dispatch);
        if (res.data.success) {
            setCartItems([]);
        }
    }

    useEffect(() => {
        async function getCart() {
            setLoading(true);
            const res = await getCartData(token, dispatch);
            if (res) {
                setCartItems(res);
                setLoading(false);
            }
        }
        getCart();
    }, [])

    return (
        <>
            {loading && <div className='loader'></div>}
            {!loading && <div className='space-y-6'>
                <h1 className='font-bold text-4xl'>Cart Items ({cartItems.length})</h1>
                <div className='flex flex-grow'>
                    <div className='space-y-6 w-1/2'>
                        {cartItems.map((item) => {
                            return <CartItem key={item._id} setCartItems={setCartItems} item={item} />
                        })
                        }
                    </div>
                    <div className='ml-20'>
                        <h1 className='text-4xl font-bold'>Total Price :- {totalPrice}</h1>
                        <button onClick={handleBuy} className=' transition-all ease-in-out duration-150 hover:scale-95 cursor-pointer px-6 py-2 rounded-md bg-black text-white/80'>Buy now</button>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Cart