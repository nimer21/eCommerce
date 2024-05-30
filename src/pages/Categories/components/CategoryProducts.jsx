import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";

export default function CategoryProducts() {
    const {id} = useParams('id');
    console.log(id);
    const [products, setProducts] = useState([]);
    const getProducts = async () =>{
        const {data} = await axios.get( `${import.meta.env.VITE_API_URL}/products/category/${id}` );
        console.log(data);
        setProducts(data.products);
    };

    useEffect(() => {
            getProducts();
        }, []);
  return (
    <div className='row'>
        {
            products.map((product) => (
                <div className='col-md-4'>
                <div className='product' key={product._id}>
                    <h4>{product.name}</h4>
                    <img src={product.mainImage.secure_url} alt="" />
                    <p>{product.price}</p>
                </div>
                </div>
            ))
        };
    </div>
  )
}
