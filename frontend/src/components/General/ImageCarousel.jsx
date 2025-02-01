import React, { useState } from 'react'
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
function ImageCarousel({ item }) {
    const [index, setIndex] = useState(0);
    function handleIncrement() {
        setIndex((prev) => {
            if (prev == item.image?.length - 1) {
                return 0;
            }
            else {
                return prev + 1;
            }
        })
    }
    function handleDecrement() {
        setIndex((prev) => {
            if (prev == 0) {
                return item.image?.length - 1;
            }
            else {
                return prev - 1;
            }
        })
    }
    return (
        <div className='overflow-hidden w-[90%] h-[450px]'>
            <div className='relative'>
                {item.image?.length > 0 && (
                    <img className='w-full h-full object-cover' src={`${import.meta.env.VITE_APP_BACKEND_URL}/${item.image[index]}`} alt="Image Carousel" />
                )}
                <div onClick={() => handleDecrement()} className='absolute left-1 border top-[45%] bg-white rounded-full'><FaAngleLeft size={30} /></div>
                <div onClick={() => handleIncrement()} className='absolute right-1 border top-[45%] bg-white rounded-full'><FaAngleRight size={30} /></div>
            </div>
        </div>
    )
}

export default ImageCarousel