import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getItemsData } from '../services/operations/item';
import { useSelector } from 'react-redux';
import ItemCard from '../components/ItemsPage/ItemCard';

function Items() {
  const { token } = useSelector(state => state.auth)
  const [items, setItems] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    async function getData() {
      const data = await getItemsData(token);
      if (data) {
        setItems(data);
      }
    }
    getData();
  }, [])
  return (
    <div className='space-y-10'>
      <div className='flex justify-end px-6'><button className=' cursor-pointer px-6 py-2 rounded-md bg-black text-white' onClick={() => navigate('/dashboard/add-item')}>Add Item</button></div>
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

export default Items