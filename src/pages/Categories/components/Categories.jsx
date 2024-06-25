import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Categories.css";
import { assets } from "../../../assets/assets";
import { NavLink, Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import { menu_list } from "../../../assets/assets";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

//import './styles.css';

// import required modules
import { FreeMode, Pagination } from "swiper/modules";

export default function Categories({ categoryId, setCategory }) {
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=9`
      );
      //console.log(data);
      setCategories(data.categories);
      //setLoader(false);
      setError("");
    } catch (error) {
      setError("Tiger: Error to Load Data  | " + error);
      //console.log("Tiger: catch err ...= "+error);
      //setLoader(false);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getCategories();
    //console.log("fetched data", getCategories());
  }, []);
  if (loader) {
    return <Loader />;
  }
  return (
    <>
      {error ? <p>{error}</p> : null}
      {error ?? <p>{error}</p>}

      <div className="explore-category" id="explore-category">
        <h1>Explore Our Category</h1>
        <p className="explore-category-text"></p>
        <div className="explore-category-list">
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
          >
            {/* {menu_list.map((item,index)=>{
            return (
              
      <SwiperSlide>
              <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-category-list-item">
     
                <img className={category===item.menu_name?"active" :""} src={item.menu_image} alt="" />
        
              </div>
      </SwiperSlide>
              
            )
          })}*/}
            {categories.length > 0 ? (
              categories.map((item, index) => {
                return (
                  <SwiperSlide>
                   {/*<Link to={`/Categories/${item._id}`}>*/} 
                    <div
                      onClick={() =>
                        setCategory((prev) =>
                          prev === item._id ? "All" : item._id
                        )
                      }
                      key={index}
                      className="explore-category-list-item"
                    >
                      <img
                        className={categoryId === item._id ? "active" : ""}
                        src={item.image.secure_url}
                        alt=""
                      />
                    </div>
                     {/*</Link>*/} 
                    
                  </SwiperSlide>
                );
              })
            ) : (
              <h2>Empty Category</h2>
            )}
          </Swiper>
        </div>
        <hr />
      </div>
    </>
  );
}
