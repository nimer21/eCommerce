import React, {useContext,useState} from 'react'
import './Products.css'
//import ProductItem from '../../ProductItem/components/ProductItem'
//import {StoreContext} from '../../context/StoreContext';
import { StoreContext } from '../../../context/StoreContext';
//import { StoreContext } from "../../context/User";
import ProductItem from './../../ProductItem/components/ProductItem';
import useResource from '../../../hooks/useResource';

export default function Products({categoryId}) {
  //const {food_list} = useContext(StoreContext);
  const {products, isLoading} = useResource(`${import.meta.env.VITE_API_URL}/products?page=1&limit=10`);

  const [page, setPage] = React.useState(1);
  const [numberOfPages, setNumberOfPage] = useState(1);
  const skip = (page - 1) * 10;
  
//*****************************************************************************
  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li
      className="page-item"
        id={number}
      >
        <button onClick={()=>setPage(number)} className="page-link">{number}</button>
      </li>
    );
  });
//*****************************************************************************

      //const total = data.total;
      //const limit = data.limit;
      //setNumberOfPage(Math.ceil(total / limit));

  return (
    <div className='product-display' id="product-display">
      <h2>Top Product near you</h2>
      <div className="product-display-list">
        {/*  {food_list.map((item,index)=>{
          {console.log(category,item.category);}
          if(category==="All" || category===item.category){
          return(
           <ProductItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
          )
        }
        })} */}

        

        {products.map((item,index)=>{
          {console.log("item.categoryId = "+item.categoryId)}
          if(categoryId==="All" || categoryId===item.categoryId){
          return(
           <ProductItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.mainImage.secure_url}/>
          )
        }
        })}
      </div>
      <div className="conatiner d-flex flex-column gap-3 align-items-center">
      <ul className="pagination">
  <li className="page-item"><button  className="page-link">Previous</button></li>
  {renderPageNumbers}
  <li className="page-item"><button className="page-link">Next</button></li>

  </ul>
  </div>
    </div>
    
  )
}
