import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import CartCard from "../components/CartCard";
import "../static/styles/CartPage.css"

function CartPage() {
    const { developmentBackendLink, productionBackendLink } = useOutletContext();
    const [items, setItems] = useState([]);

    var cart = JSON.parse(localStorage.getItem("cart"))

    useEffect(() => {
        var payload = {
            cart: cart,
        }
        const headers = {
            "Content-Type": "application/json",
        }
        const requestOptions = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
        }
        fetch(`${developmentBackendLink}cart`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setItems(data.items)
                
                if (data.error) {
                    console.log(data.error)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <>            
            <h1 style={{marginLeft: "1%", marginTop: "1%", fontFamily: "'Open Sans', sans-serif"}}>Cart Items</h1>
            <hr />
            {items.length > 0 
            ?  <div className="cart" style={{margin: "1%"}}>
                    <div className="row" style={{width: "100%"}}>
                        {items.map((item, index) => (
                            <div key={index} className="col-lg-3 col-md-4 col-sm-12 col-xs-12" style={{padding: "1%"}}>
                                <CartCard 
                                    img={item.image_link}
                                    name={item.name}
                                    company={item.company}
                                    price={item.price}
                                    index={index}
                                    type={item.type.toUpperCase()}
                                />
                            </div>                            
                        ))}
                    </div>

                    <hr />
                    
                    <button className="btn btn-primary">Proceed to buy</button>
                </div>
            : <p style={{marginLeft: "1%", marginTop: "1%"}}>cart is empty...</p>
            }
        </>
    )
}

export default CartPage