import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import LaptopsPage from './pages/LaptopsPage';
import MonitorsPage from './pages/MonitorsPage';
import KeyboardsPage from './pages/KeyboardsPage';
import MousesPage from './pages/MousesPage';
import Cart from './pages/Cart';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {index: true, element: <HomePage />},
      {path: "/products", element: <ProductsPage />},
      {path: "/products/laptops", element: <LaptopsPage />},
      {path: "/products/monitors", element: <MonitorsPage />},
      {path: "/products/keyboards", element: <KeyboardsPage />},
      {path: "/products/mouses", element: <MousesPage />},
      {path: "/cart", element: <Cart />},
      {path: "/search", element: <SearchPage />},
      {path: "/profile", element: <ProfilePage />},
      {path: "/login", element: <LoginPage />}
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

