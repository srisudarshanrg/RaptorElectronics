import { Link, Outlet, useNavigate } from 'react-router-dom';
import './static/styles/App.css';
import { useEffect, useState } from 'react';
import Alert from './components/Alert';

function App() {
  const developmentBackendLink = "http://localhost:2400/";
  const productionBackendLink = "https://raptorelectronics-production.up.railway.app/";

  const [numberCart, setNumberCart] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorAlert, setErrorAlert] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [addedToCart, setAddedToCart] = useState(false);
  const [newCartItemName, setNewCartItemName] = useState("");
  const [successAlert, setSuccessAlert] = useState("");

  var user = sessionStorage.getItem("user");

  const logout = () => {
    sessionStorage.removeItem("user");
    user = null;
    setLoggedIn(false);
  }

  if (user !== null) {
    user = JSON.parse(user)
  }

  useEffect(() => {
    if (user !== null) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }

    var cart = JSON.parse(localStorage.getItem("cart"))
    if (cart !== null) {
      setNumberCart(cart.length)
    } else {
      var newCart = []
      localStorage.setItem("cart", JSON.stringify(newCart))
      setNumberCart(0)
    }
  })

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    console.log(searchQuery);

    let payload = {
      search_query: searchQuery,
    }
    const headers = {
      "Content-Type": "application/json",
    }
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    }

    fetch(`${developmentBackendLink}`)
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
              {loggedIn && 
                <li className="nav-item">
                  <Link to="/bought-items" className="nav-link nav-margin">Your Items</Link>
                </li>
              }          
            </ul>
            
            <ul className="navbar-nav">
              <form className="d-flex InputContainer" role="search" onSubmit={handleSearchSubmit}>
                <input type="text" name="text" className="input-search" id="searchBox" placeholder="Search" onChange={(event) => {setSearchQuery(event.target.value)}} />                
                <label htmlFor="input-search" className="labelforsearch"></label>
                <button className="micButton" style={{backgroundColor: "rgb(255, 81, 0)"}}>
                  <svg style={{color: "#fff"}} viewBox="0 0 512 512" className="searchIcon"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
                </button>
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
                    <Link className="nav-margin" style={{textDecoration: "none", color: "#fff"}}><i className="fa-solid fa-indian-rupee-sign"></i> {user.amount}</Link>
                    <Link to="/profile" className="nav-margin profile-link"><i className="fa-regular fa-user"></i></Link>
                    <button className="btn btn-danger nav-margin" onClick={logout}>Logout</button>
                  </>
                )}
              </li>
            </ul>
          </div>          
        </div>
      </nav>

      {addedToCart &&
        <div className="alert alert-success" role="alert" style={{position: "fixed", zIndex: "1000", width: "100%"}}>
          <i className="fa-solid fa-check"></i> Added "{newCartItemName}" to cart
        </div>        
      }

      {successAlert && (
        <>
          <Alert color="success" message={<><i className="fa-solid fa-check"></i> {successAlert}</>} />
        </>  
      )}

      {errorAlert.length > 0 &&
        <>
          {errorAlert.map((error, index) => (
              <Alert key={index} color="danger" message={error} />
            )
          )}
        </>
      }

      <Outlet
        context={{
          developmentBackendLink,
          productionBackendLink,
          errorAlert,
          setErrorAlert,
          navigate,
          user,
          loggedIn,
          setLoggedIn,
          numberCart,
          setNumberCart,
          addedToCart,
          setAddedToCart,
          newCartItemName,
          setNewCartItemName,
          setSuccessAlert,
        }}
      />

      <div className="footer" style={{marginTop: "3%"}}>
        <div className="row" style={{width: "100%"}}>
          <h2>Links</h2>
          <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <Link to="/" style={{fontSize: "1.2rem"}}>Home</Link>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <Link to="/cart" style={{fontSize: "1.2rem"}}>Cart</Link>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <Link to="/login" style={{fontSize: "1.2rem"}}>Login</Link>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <Link to="/sign-up" style={{fontSize: "1.2rem"}}>Sign-Up</Link>
          </div>
        </div>

        <hr />

        <div className="row" style={{width: "100%"}}>
          <h2>Products</h2>
          <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <Link to="/products/laptops" style={{fontSize: "1.2rem"}}>Laptops</Link>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <Link to="/products/monitors" style={{fontSize: "1.2rem"}}>Monitors</Link>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <Link to="/products/keyboards" style={{fontSize: "1.2rem"}}>Keyboards</Link>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <Link to="/products/mouses" style={{fontSize: "1.2rem"}}>Mouses</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
