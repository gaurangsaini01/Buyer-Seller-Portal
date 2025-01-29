import React from 'react'

function ItemCard({ item }) {
    return (
        <div className='w-[400px] flex flex-col h-[400px]'>
            <div>
                <img src={item.image} alt="Item Image" />
            </div>
            <div>{item.itemName}</div>
            <div>{item.description}</div>
            <div>{item.price}</div>
            <div>{item.category}</div>

        </div>
    )
}

export default ItemCard