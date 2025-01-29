import React from 'react'

function CartItem({ item }) {
    return (
        <div>
            <div>{item.itemName}</div>
            <div>{item.description}</div>
        </div>
    )
}

export default CartItem