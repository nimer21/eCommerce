import React from 'react'
import Root from './roots/Root.jsx'
import Home from './pages/Home/components/Home.jsx'
import Cart from './pages/Cart/components/Cart.jsx'
import Categories from './pages/Categories/components/Categories.jsx'
import Products from './pages/Products/components/Products.jsx'
import Profile from './pages/Profile/components/Profile.jsx'
import Register from './pages/Register/Register.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import NotFound from './pages/NotFound/NotFound.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './auth/ProtectedRoutes.jsx'
import UnProtectedRoutes from './auth/UnProtectedRoutes.jsx'
import { useState } from "react";
import UserContextProvider from './context/User.jsx'
import CategoryProducts from './pages/Categories/components/CategoryProducts.jsx'

export default function App() {
  //const [userName,setUserName] = useState('Nimer');
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/Cart',
        element: 
        <ProtectedRoutes>
        <Cart />
        </ProtectedRoutes>
      },
      {
        path: '/Categories',
        element: <Categories />
      },
      {
        path: '/Products',
        element:
        <ProtectedRoutes>
          <Products />
        </ProtectedRoutes>
      },
      {
        path: '/Categories/:id',
        element: 
        <ProtectedRoutes>
          <CategoryProducts />
        </ProtectedRoutes>

      },
      {
        path: '/profile/:id',
        element: <Profile />
      },
      {
        path: '/register',
        element: 
        <UnProtectedRoutes>
          <UserContextProvider>
        <Register />
        </UserContextProvider>
        </UnProtectedRoutes>
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);
  return (
    <div className='app'>
      <UserContextProvider>
    <RouterProvider router={router} />
      </UserContextProvider>
    <ToastContainer />
    </div>
  )
}
