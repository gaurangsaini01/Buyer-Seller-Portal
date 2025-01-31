import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addItem } from '../services/operations/item';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { categoriesList } from '../data';

function AddItem() {
  const { token } = useSelector(state => state.auth)
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [itemData, setItemData] = useState({
    itemName: "",
    price: 0,
    description: "",
    category: "Electronics",
  })

  async function handleSubmit(e) {
    e.preventDefault();
    if (!itemData.category || !itemData.description || !itemData.price || !itemData.itemName || itemData.itemName.trim() == "" || itemData.description.trim() == "") {
      toast.error('Missing Fields', {
        position: "top-center",
        autoClose: 1500,
        theme: "dark"
      });
      return;
    }
    const formData = new FormData();
    Object.keys(itemData).forEach(key => {
      formData.append(key, itemData[key]);
    })
    if (file) {
      formData.append('file', file);
    }
    else {
      toast.error('Upload Image', {
        position: "top-center",
        autoClose: 1500,
        theme: "dark"
      })
      return;
    }
    const res = await addItem(formData, token);
    if (res) {
      setItemData({
        itemName: "",
        price: 0,
        description: "",
        category: "Electronics",
      })
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setFile(null);
    }
  }
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  }
  function handleChange(e) {
    setItemData(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  return (
    <div className='p-6'>
      <div className='flex'>
        <button className=' cursor-pointer px-6 py-2 rounded-md bg-black text-white' onClick={() => navigate('/dashboard/items')}>Back</button>
        <div className='font-semibold w-full text-center text-3xl'>Add Item to Sell</div>
      </div>
      <div className='w-full mt-6'>
        <form onSubmit={handleSubmit} className='w-[70%]  mx-auto space-y-6 flex flex-col items-center'>
          <div className='w-full flex gap-28 items-center'>
            <label className='font-medium' htmlFor="image">Image</label>
            <input ref={fileInputRef} required type="file" className='file:border-2 file:rounded-full file:px-4' accept="image/*" name='image' onChange={handleFileChange} />

          </div>
          <div className='w-full flex justify-between items-center'>
            <label className='font-medium' htmlFor="itemName">Item Name</label>
            <input value={itemData.itemName} onChange={handleChange} className='inputEdit' type="text" name='itemName' />
          </div>
          <div className='w-full flex justify-between items-center'>
            <label className='font-medium' htmlFor="price">Price</label>
            <input value={itemData.price} onChange={handleChange} className='inputEdit' type="number" name='price' />
          </div>
          <div className='w-full flex justify-between items-center'>
            <label className='font-medium' htmlFor="description">Description</label>
            <input value={itemData.description} onChange={handleChange} className='inputEdit' type="text" name='description' />
          </div>
          <div className='w-full flex justify-between items-center'>
            <label className='font-medium' htmlFor="category">Category</label>
            <select value={itemData.category} onChange={handleChange} className='inputEdit' type="text" name='category' >
              {categoriesList.map((category) => {
                return <option value={category}>{category}</option>
              })}
              {/* <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option> */}
            </select>
          </div>
          <button className='w-[30%] py-2 border-2' type='submit'>Add Item</button>
        </form>
      </div>

    </div>
  )
}

export default AddItem