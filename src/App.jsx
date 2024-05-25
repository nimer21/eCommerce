import React from 'react'
import Root from './roots/Root.jsx'
import Home from './pages/Home/components/Home.jsx'
import Cart from './pages/Cart/components/Cart.jsx'
import Categories from './pages/Categories/components/Categories.jsx'
import Profile from './pages/Profile/components/Profile.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import NotFound from './pages/NotFound/NotFound.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/Cart',
        element: <Cart />
      },
      {
        path: '/Categories',
        element: <Categories />
      },
      {
        path: '/profile/:id',
        element: <Profile />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);
export default function App() {
  return (
    <div className='app'>
    <RouterProvider router={router} />
    </div>
  )
}
