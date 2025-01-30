import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getItemsData } from '../services/operations/item';
import { useSelector } from 'react-redux';
import ItemCard from '../components/ItemsPage/ItemCard';

function Items() {
  const { token } = useSelector(state => state.auth)
  const [items, setItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || ""; // Extract search from URL
  console.log(searchQuery)
  const [search, setSearch] = useState(searchQuery);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setSearchParams({ search }); // Updates the URL
  }

  function handleChange(e) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    async function getData() {
      const data = await getItemsData(token, searchQuery);
      if (data) {
        setItems(data);
      }
    }
    getData();
  }, [searchQuery]); // Re-run when search query changes

  return (
    <div className='space-y-10'>
      <div className='flex justify-between px-6'>
        <form onSubmit={handleSubmit} className='w-[70%] flex gap-4'>
          <input className='inputEdit rounded-md' autoComplete='off' name='search' value={search} onChange={handleChange} type="text" />
          <button className='px-6 hover:scale-95 transition-all ease-in-out duration-200 cursor-pointer py-2 rounded-md bg-white border border-black text-black' type="submit">Submit</button>
        </form>
        <button className='cursor-pointer px-6 py-2 rounded-md bg-black text-white' onClick={() => navigate('/dashboard/add-item')}>Add Item</button>
      </div>
      <div className='w-full flex flex-wrap justify-evenly gap-6'>
        {
          items.map((item) => {
            return <ItemCard key={item._id} item={item} />
          })
        }
      </div>
    </div>
  )
}

export default Items;
