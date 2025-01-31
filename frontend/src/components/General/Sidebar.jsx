import React from 'react'
import { categoriesList } from '../../data'

function Sidebar({ handleCategoryChange, selectedCategories }) {
    return (
        <div className='w-[17%] fixed bg-white h-screen border-gray-100/90 border-r'>
            {/* Category Filters */}
            <h1 className='font-medium text-xl px-6 my-6'>Categories</h1>
            <div className="flex flex-col gap-4 px-6">
                {categoriesList.map((category) => (
                    <label key={category} className="flex items-center text-sm gap-2">
                        <input
                            type="checkbox"
                            value={category}
                            checked={selectedCategories.includes(category)}
                            onChange={handleCategoryChange}
                        />
                        {category}
                    </label>
                ))}
            </div>
        </div>
    )
}

export default Sidebar