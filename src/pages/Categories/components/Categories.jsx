import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Categories.css";
import { assets } from "../../../assets/assets";
import { NavLink, Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loader,setLoader] = useState(true);
  const [error,setError] = useState('');
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=9`
      );
      //console.log(data);
      setCategories(data.categories);
      //setLoader(false);
      setError('');
    } catch (error) {
      setError('Tiger: Error to Load Data  | ' +error);
      console.log("Tiger: catch err ...= "+error);
      //setLoader(false);
    }
    finally{
      setLoader(false);
    }
  };
  useEffect(() => {
    getCategories();
    console.log("fetched data", getCategories());
  }, []);
  if(loader) {
    return <Loader/>
    
  }
  return (
    <>
    {error?<p>{error}</p>:null}
    {error??<p>{error}</p>}
      <div>Categories</div>

    <div className="row">

    {(categories.length > 0)?categories.map((category) => (
        <Link to={`/Categories/${category._id}`}>
        <div className="category-items" key={category._id}>
          <h4>{category.name}</h4>
          <img className="img" src={category.image.secure_url} />
        </div>
        </Link>
  )): <h2>Empty Category</h2>}
    </div>
    </>
  );
}
