import React from "react";
import { food_list } from "./../../assets/assets";
import { assets } from "./../../assets/assets";
import { menu_list } from "./../../assets/assets";
import './Pagination.css';
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader/Loader";

export default function Pagination() {
  //const {food_list} = useContext(StoreContext);
//<div className="col-lg-4 col-md-3 col-sm-6">
//onClick={console.log("onClick  =>  " + onClick)}
//const total = menu_list.length;
//const limit = 1;
//const numberOfPages = Math.ceil(total / limit);
const [page, setPage] = React.useState(1);
const [numberOfPages, setNumberOfPage] = useState(1);
const [loader, setLoader] = useState(true);
const skip = (page - 1) * 10;

//***************************************************************************** */
const [products, setProducts] = useState([]);

const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products?limit=10&skip=${skip}`
      );
      setProducts(data.products);
      console.log("*****products  =>  " + data);
      console.log("*****data.total  =>  " + data.total);
      console.log("*****data.limit  =>  " + data.limit);
      onsole.log("*****skip  =>  " + skip);
      const total = data.total;
      const limit = data.limit;
      //const numberOfPages = Math.ceil(total / limit);
      //setNumberOfPage = Math.ceil(total / limit);
      //let x = Math.ceil(total / limit)
      setNumberOfPage(Math.ceil(total / limit));
      console.log("*****numberOfPages  =>  " + numberOfPages);

    } catch (error) {
      console.log("Tiger: catch err ...= "+error);
    }
    finally {
        setLoader(false);
      }
  };


//***************************************************************************** */
//console.log("menu_list  =>  " + menu_list);

 
  const displayProducts = ({ number }) => {
    console.log("number  =>  " + number);
    setPage(number);
  };


  //console.log("skip  =>  " + skip);
  //console.log("numberOfPages  =>  " + numberOfPages);

  /*
  let paginationLink = `<li className="page-item"><a class="page-link" href="#">Previous</a></li>`;
  for (let i = 1; i <= numberOfPages; i++) {
    paginationLink += `<li className="page-item"><a class="page-link" href="#">${i}</a></li>`;
  }
  paginationLink += `<li class="page-item"><a class="page-link" href="#">Next</a></li>`;
  console.log("paginationLink  =>  " + paginationLink);
  */

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
        <button onClick={()=>{setPage(number); getProducts();}} className="page-link">{number}</button>
      </li>
    );
  });
//*****************************************************************************

  useEffect(() => {
    getProducts();
    //console.log("fetched data", getProducts());
  }, []);
  if (loader) {
    return <Loader />;
  }
//*****************************************************************************
  return (
    <>
      <div>Pagination</div>

<section className="products">
    <div className="conatiner d-flex flex-column gap-3 align-items-center">
        <h1>Products</h1>
        <div className="row gy-3">
        {products.map((item, index) => {
        return (
            <div className="col-lg-4 col-md-3 col-sm-6">
            <div className="card" style={{ width: "18rem" }}>
              <img className="card-img-top" src={item.thumbnail} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        );
      })}
        </div>
        <nav aria-label="Page navigation example">
  <ul className="pagination">
  <li className="page-item"><button onClick={()=>{setPage(parseInt(page)-1); getProducts();}} className="page-link">Previous</button></li>
  {renderPageNumbers}
  <li className="page-item"><button onClick={()=>{setPage(page+1); getProducts();}} className="page-link">Next</button></li>

  </ul>
</nav>
    </div>
</section>

    </>
  );
}
