import React from 'react'

function ImageCarousel({ item }) {
    return (
        <div className='overflow-hidden w-[90%] h-[450px]'>

            {Array.isArray(item.image) && item.image.map((i) => {
                return <img className='w-full h-full object-cover' src={`${import.meta.env.VITE_APP_BACKEND_URL}/${i}`} alt="" />
            })}



        </div>
    )
}

export default ImageCarousel