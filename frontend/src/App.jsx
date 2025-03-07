import { Link, Outlet } from 'react-router-dom';
import './App.css';
import { useState } from 'react';

function App() {
  const developmentBackendLink = "http://localhost:2400/";
  const productionBackendLink = "https://raptorelectronics-production.up.railway.app/";

  const [numberCart, setNumberCart] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  const logout = () => {

  }

  return (
    <div className="App">
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">RaptorElectronics</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="" className="nav-link nav-margin" aria-current="page">Home</Link>
              </li>

              <li className="nav-item">
                <Link to="/products" className="nav-link nav-margin">Products</Link>
              </li>

              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle nav-margin" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Product Categories
                </Link>
                <ul className="dropdown-menu">
                  <li><Link to="/products/laptops" className="dropdown-item">Laptops</Link></li>
                  <li><Link to="/products/monitors" className="dropdown-item">Monitors</Link></li>
                  <li><Link to="/products/keyboards" className="dropdown-item">Keyboards</Link></li>
                  <li><Link to="/products/mouses" className="dropdown-item">Mouses</Link></li>
                </ul>
              </li>             
            </ul>

            <ul className="navbar-nav">
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-primary" type="submit">Search</button>
              </form>
              <li className="nav-item">
                <Link to="/cart" className="nav-link nav-margin" aria-disabled="true">                  
                  <i className="fa-solid fa-cart-shopping" style={{fontSize: "1.3rem"}}></i>
                  <span className="position-absolute translate-middle badge rounded-pill bg-primary">
                    {numberCart}
                  </span>
                </Link>                
              </li>              
              <li className="nav-item">
                {!loggedIn ? (
                  <>
                    <Link to="/login" className="btn btn-success nav-margin">Login</Link>
                  </>
                ) : (
                  <>
                    <Link to="/profile" className="nav-margin profile-link"><i className="fa-regular fa-user"></i></Link>
                    <button className="btn btn-danger nav-margin" onClick={logout}>Logout</button>
                  </>
                )}
              </li>
            </ul>
          </div>          
        </div>
      </nav>

      <Outlet
        context={{
          developmentBackendLink,
          productionBackendLink,
          numberCart,
          setNumberCart,
        }}
      />
    </div>
  );
}

export default App;
