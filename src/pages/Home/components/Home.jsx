import React from 'react'
import Header from './../../../components/Header/Header';
import Categories from '../../Categories/components/Categories.jsx';
import Products from '../../Products/components/Products.jsx';

export default function Home() {
  const [categoryId, setCategory] = React.useState('All');
  return (
    <div>
      <Header/>
      <Categories categoryId={categoryId} setCategory={setCategory}/>
      <Products categoryId={categoryId}/>
    </div>
  )
}
