import { createContext, useState, useEffect } from "react";
import { food_list } from "../assets/assets";
import useResource from '../hooks/useResource';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const {products, isLoading} = useResource(`${import.meta.env.VITE_API_URL}/products?page=1&limit=10`);
  //******************************************************************************************** */
  const [cartItems, setCartItems] = useState({});
  console.log('products ==  '+products.name);
  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      // If the user will add the item first time in the cart then this statement will excuted
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      //console.log('Added 1st to cart');
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      //console.log('Added +1 to cart');
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    //console.log('removeFromCart 1 ');
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product._id === item);
        
        if (itemInfo && itemInfo?.price) {
            //return totalAmount += (itemInfo.price * cartItems[item]);
             //console.log("Test Price = "+item);
            totalAmount += itemInfo.price * cartItems[item];
          }
          //return totalAmount += 0;
      }
    }
    return totalAmount;
  };
/*
  const getFilteredItems = (query) =>{
    if(!query) return products;
    return products.filter(products=>products.name.toLowerCase().includes(query.toLowerCase()));
  }
*/
  /*  useEffect(()=>{
        console.log(cartItems);
    },[cartItems]);    */
  //******************************************************************************************** */
  const contextValue = {
    //food_list,
    products,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
