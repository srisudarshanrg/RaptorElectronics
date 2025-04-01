import React from 'react';
import ReactDOM from 'react-dom/client';
import './static/styles/index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import LaptopsPage from './pages/LaptopsPage';
import MonitorsPage from './pages/MonitorsPage';
import KeyboardsPage from './pages/KeyboardsPage';
import MousesPage from './pages/MousesPage';
import CartPage from './pages/CartPage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';
import BuyPage from './pages/BuyPage';
import YourItems from './pages/YourItemsPage';
import ItemPage from './pages/ItemPage';

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
      {path: "/cart", element: <CartPage />},
      {path: "/buy", element: <BuyPage />},
      {path: "/search", element: <SearchPage />},
      {path: "/profile", element: <ProfilePage />},
      {path: "/login", element: <LoginPage />},
      {path: "/sign-up", element: <SignupPage />},
      {path: "/bought-items", element: <YourItems />},
      {path: "/product/:type/:name", element: <ItemPage />},
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

