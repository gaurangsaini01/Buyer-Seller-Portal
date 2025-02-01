import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addItem } from '../services/operations/item';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { categoriesList } from '../data';

function AddItem() {
  const { token } = useSelector(state => state.auth);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [itemData, setItemData] = useState({
    itemName: "",
    price: 0,
    description: "",
    category: "Electronics",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!itemData.category || !itemData.description || !itemData.price || !itemData.itemName || itemData.itemName.trim() === "" || itemData.description.trim() === "") {
      toast.error('Missing Fields', { position: "top-center", autoClose: 1500, theme: "dark" });
      return;
    }
    const formData = new FormData();
    Object.keys(itemData).forEach(key => {
      formData.append(key, itemData[key]);
    });
    if (file.length > 0) {
      for (let i = 0; i < file.length; i++) {
        formData.append('file', file[i]);
      }
    } else {
      toast.error('Upload Image', { position: "top-center", autoClose: 1500, theme: "dark" });
      return;
    }
    const res = await addItem(formData, token);
    if (res) {
      setItemData({
        itemName: "",
        price: 0,
        description: "",
        category: "Electronics",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setFile([]);
    }
  }
  function handleFileChange(e) {
    setFile(e.target.files);
  }
  function handleChange(e) {
    setItemData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100 p-6'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-lg'>
        <div className='flex items-center justify-between mb-6'>
          <button className='px-6 py-2 rounded-md bg-black text-white' onClick={() => navigate('/dashboard/items')}>Back</button>
          <h2 className='font-semibold text-3xl'>Add Details</h2>
        </div>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block font-medium mb-1' htmlFor='image'>Upload Image</label>
            <input ref={fileInputRef} required multiple type='file' className='block w-full border border-gray-300 rounded-lg p-2 file:bg-black file:text-white file:px-4 file:py-2 file:rounded-md' accept='image/*' name='image' onChange={handleFileChange} />
          </div>
          <div>
            <label className='block font-medium mb-1' htmlFor='itemName'>Item Name</label>
            <input value={itemData.itemName} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded-lg' type='text' name='itemName' />
          </div>
          <div>
            <label className='block font-medium mb-1' htmlFor='price'>Price</label>
            <input value={itemData.price} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded-lg' type='number' name='price' />
          </div>
          <div>
            <label className='block font-medium mb-1' htmlFor='description'>Description</label>
            <textarea value={itemData.description} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded-lg' name='description'></textarea>
          </div>
          <div>
            <label className='block font-medium mb-1' htmlFor='category'>Category</label>
            <select value={itemData.category} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded-lg' name='category'>
              {categoriesList.map((category, index) => <option key={index} value={category}>{category}</option>)}
            </select>
          </div>
          <button className='w-full py-2 bg-black text-white rounded-lg' type='submit'>Add Item</button>
        </form>
      </div>
    </div>
  );
}

export default AddItem;