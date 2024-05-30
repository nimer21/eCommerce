import React, { Children } from 'react'
import {Navigate} from 'react-router-dom';

export default function ProtectedRoutes({ children}) {
    //const navigate = useNavigate();
    const token = localStorage.getItem('userToken');
    if (!token) {
      //navigate('/Login');
      return <Navigate to='/Login' replace/>
      {()=>setShowLogin(true)}
      //return setShowLogin(true);
    }
  return children;
}
