import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getCartData } from '../services/operations/cart';
import CartItem from '../components/CartItem';

function Cart() {
    const [cartItems, setCartItems] = useState([])
    const { token } = useSelector(state => state.auth)
    useEffect(() => {
        async function getCart() {
            const res = await getCartData(token);
            if (res) {
                setCartItems(res);
            }
        }
        getCart();
    }, [])
    return (
        <div>{cartItems.map((item) => {
            return <CartItem key={item._id} item={item} />
        })
        }</div>
    )
}

export default Cart