import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

function ImageCarousel({ item }) {
    const [index, setIndex] = useState(0);

    function handleIncrement() {
        setIndex((prev) => (prev === item.image?.length - 1 ? 0 : prev + 1));
    }

    function handleDecrement() {
        setIndex((prev) => (prev === 0 ? item.image?.length - 1 : prev - 1));
    }

    return (
        <div className="relative w-[90%] h-[450px] flex justify-center items-center overflow-hidden">
            {item.image?.length > 0 && (
                <div className="relative w-full h-full flex justify-center items-center">
                    <img 
                        className="w-full h-full object-cover"
                        src={`${import.meta.env.VITE_APP_BACKEND_URL}/${item.image[index]}`} 
                        alt="Image Carousel" 
                    />
                    <button 
                        onClick={handleDecrement} 
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                    >
                        <FaAngleLeft size={30} />
                    </button>
                    <button 
                        onClick={handleIncrement} 
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                    >
                        <FaAngleRight size={30} />
                    </button>
                </div>
            )}
        </div>
    );
}

export default ImageCarousel;
