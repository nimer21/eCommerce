import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Categories.css'

export default function Categories() {
  const [categories,setCategories] = useState([]);
  const getCategories = async()=>{
    const {data} = await axios.get(`https://ecommerce-node4-five.vercel.app/categories/active?page=1&limit=5`);
    //console.log(data);
    setCategories(data.categories);
  }
  useEffect(()=>{
    getCategories();
    console.log('fetched data', getCategories());
  },[])
  return (
    <>
    <div>Categories</div>  
    { categories.map(category=>
      <div className='category' key={category.id}>
      <h4>{category.name}</h4>
      <img className='img' src={category.image.secure_url}/>
      </div>
  )}
  </>
  )
}
