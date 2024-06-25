import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";

export default function useResource(url) {
    const [products, setProducts] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const controller = new AbortController();

    const getProducts = async () =>{
        try{
            const {data} = await axios.get( url, {
                signal: controller.signal,
            } );
            //console.log(data);
            setProducts(data.products);
        }catch(e){
            console.log("Error: " + e.message);
        }finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
            getProducts();

            // Unmounting the component
            return ()=>{
                controller.abort(); // cancel request
                //console.log("Clean up from getProducts() | cancel request");
            };
        }, []);
  return (
    {products, isLoading}
  )
}
