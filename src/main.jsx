import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App.jsx';
import './index.css';
import StoreContextProvider from "./context/StoreContext.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
 // <React.StrictMode>

    <App />

 // </React.StrictMode>,
)
