import React from 'react'
import './ProductItem.css'
import { assets } from '../../../assets/assets'
import { useState, useContext } from "react";
import { StoreContext } from '../../../context/StoreContext';
import useResource from '../../../hooks/useResource';
import Loader from "../../../components/Loader/Loader";

export default function ProductItem({id,name,price,description,image}) {
    //const {setUserToken} = useContext(UserContext);
    //const [itemCount,setItemCount] = useState(0);
    const {cartItems,addToCart,removeFromCart} = useContext(StoreContext);
    const {products, isLoading} = useResource(`${import.meta.env.VITE_API_URL}/products?page=1&limit=10`);
    if (isLoading) {
        return <Loader />;
      }
      //console.log('ID= '+id + 'Name=  '+name);
  return (
    
    <div className='product-item'>
        <div className="product-item-img-container">
            <img className='product-item-img' src={image} alt="" />
            {!cartItems[id] //()=>addToCart[id] , ()=>removeFromCart[id] , cartItems[id]
            ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=''/> //setItemCount(prev=>prev+1) | setItemCount(prev=>prev-1)
            :<div className='product-item-counter'>
                <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" /> 
                <p>{cartItems[id]}</p>
                <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                </div>
        }
        </div>
        <div className="product-item-info">
            <div className="product-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className='product-item-desc'>{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
        
    </div>
  )
}
