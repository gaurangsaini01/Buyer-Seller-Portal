import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getItemsData } from '../services/operations/item';
import { useSelector } from 'react-redux';
import ItemCard from '../components/ItemsPage/ItemCard';

const categoriesList = ["Electronics", "Fashion", "Health", "Education"];

function Items() {
  const { token } = useSelector(state => state.auth);
  const [items, setItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const categories = searchParams.get("categories")?.split(",") || [];

  const [search, setSearch] = useState(searchQuery);
  const [selectedCategories, setSelectedCategories] = useState(categories);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setSearchParams({ search, categories: selectedCategories.join(",") });
  }

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleCategoryChange(e) {
    const category = e.target.value;
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  }

  useEffect(() => {
    async function getData() {
      const data = await getItemsData(token, searchQuery, selectedCategories);
      if (data) {
        setItems(data);
      }
    }
    getData();
  }, [searchQuery, selectedCategories]);

  return (
    <div className='space-y-10'>
      <div className='flex justify-between px-6'>
        <form onSubmit={handleSubmit} className='w-[70%] flex gap-4'>
          <input className='inputEdit rounded-md' autoComplete='off' name='search' value={search} onChange={handleChange} type="text" />
          <button className='px-6 hover:scale-95 transition-all ease-in-out duration-200 cursor-pointer py-2 rounded-md bg-white border border-black text-black' type="submit">Submit</button>
        </form>
        <button className='cursor-pointer px-6 py-2 rounded-md bg-black text-white' onClick={() => navigate('/dashboard/add-item')}>Add Item</button>
      </div>

      {/* Category Filters */}
      <div className="flex gap-4 px-6">
        {categoriesList.map((category) => (
          <label key={category} className="flex items-center gap-2">
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

      {/* Items List */}
      <div className='w-full flex flex-wrap gap-12'>
        {items.length > 0 ? items.map((item) => (
          <ItemCard key={item._id} item={item} />
        )) : <p>No items found</p>}
      </div>
    </div>
  )
}

export default Items;
