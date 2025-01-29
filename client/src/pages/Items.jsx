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
    <div>
      <button onClick={() => navigate('/dashboard/add-item')}>Add Item</button>
      <div className='w-full border-2'>
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