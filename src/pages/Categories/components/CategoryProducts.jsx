import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";
import useResource from '../../../hooks/useResource';

export default function CategoryProducts() {
    const {id} = useParams('id');
    console.log(id);
    const {products, isLoading} = useResource(`${import.meta.env.VITE_API_URL}/products/category/${id}`);
    /* Use Custom Hook to separate Logic => UseResource
    const [products, setProducts] = useState([]);
    const getProducts = async () =>{
        const {data} = await axios.get( `${import.meta.env.VITE_API_URL}/products/category/${id}` );
        console.log(data);
        setProducts(data.products);
    };

    useEffect(() => {
            getProducts();
        }, []);
        */

        const addToCart = async(id) => {
            //console.log('add to cart');
            const token = localStorage.getItem('userToken');
            console.log("Here:  "+`${import.meta.env.VITE_BEARER_KEY+token}`);
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/cart`,{productId:id},
                {
                    headers: {
                        //Authorization: `Bearer ${token}`
                        //Authorization: `Tariq__${token}`
                        //Authorization: token
                        Authorization: `${import.meta.env.VITE_BEARER_KEY+token}`
                    }
                }
            );
            console.log(data);
        };
        if(isLoading) {
            return <p>Loading.....!</p>
        }
  return (
    <div className='row'>
        {
            products.map((product) => (
                <div className='col-md-4'>
                <div className='product' key={product._id}>
                    <h4>{product.name}</h4>
                    <img src={product.mainImage.secure_url} alt="" />
                    <p>{product.price}</p>
                    <button onClick={()=>addToCart(product._id)} className='btn-outline-danger'>Add To Cart</button>
                </div>
                </div>
            ))
        };
    </div>
  )
}
