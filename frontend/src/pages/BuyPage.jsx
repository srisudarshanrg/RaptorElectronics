import { useEffect, useState } from "react";
import { useOutletContext, useRouteLoaderData } from "react-router-dom"

function BuyPage() {
    const { developmentBackendLink, productionBackendLink, navigate, setErrorAlert, errorAlert,
        setSuccessAlert } = useOutletContext();
    
    const [cart, setCart] = useState([]);

    var cartRecieved = JSON.parse(localStorage.getItem("cart"))

    useEffect(() => {
        var user = sessionStorage.getItem("user")
        if (user === null) {
            navigate("/login")
            var errors = errorAlert
            errors.push("You need to login first to be able to buy a product")
        }

        if (cartRecieved !== null) {
            setCart(cartRecieved)
        }
    }, [])

    var totalCost = 0;
    cart.forEach((c) => {
        totalCost += c.price
    })

    const buy = () => {
        var user = JSON.parse(sessionStorage.getItem("user"))
        var new_amount = user.amount - totalCost
        if (new_amount < 0) {
            setErrorAlert(["Cannot buy products as total cost is more than the amount you have"])
            return
        }
        user.amount = new_amount
        sessionStorage.setItem("user", JSON.stringify(user))
        console.log(new_amount, user.amount)

        var toBeBought = JSON.parse(localStorage.getItem("cart"))
        if (toBeBought.length === 0) {
            setErrorAlert(["Add items to cart to buy them"])
            return
        }

        var allItems = []

        toBeBought.forEach((t) => {
            var newItem = {
                "item_id": t.id,
                "item_type": t.type,
                "item_name": t.name,
                "price": t.price,
                "user_id": user.id, 
            }
            allItems.push(newItem)
        })

        const headers = {
            "Content-Type": "application/json",
        }
        var items = {
            items: allItems,
            user_update: {
                "id": user.id,
                "amount": user.amount,
            },
        }
        const requestOptions = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(items),
        }
        fetch(`${developmentBackendLink}buy`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.confirmation === true) {
                    var newCart = []
                    localStorage.setItem("cart", JSON.stringify(newCart))
                    window.location.reload(false)
                } else {
                    setErrorAlert("An unexpected error occurred. Please try again")
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div style={{padding: "2%"}}>
            <h1>Proceed to buy?</h1>
            <hr />

            <h3>Items</h3>
            <table className="table table-dark table-striped table-hover" style={{width: "60%"}}>
                <thead>
                    <tr>
                        <td>Item</td>
                        <td>Price</td>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((c, index) => (
                        <tr key={index}>
                            <td>{c.name}</td>
                            <td><i className="fa-solid fa-indian-rupee-sign"></i> {c.price}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot style={{borderTop: "2px solid rgb(100, 100, 100)"}}>
                    <tr>
                        <td><h5>TOTAL</h5></td>
                        <td><h5><i className="fa-solid fa-indian-rupee-sign"></i> {totalCost}</h5></td>
                    </tr>
                </tfoot>
            </table>

            <hr />

            <button className="btn btn-primary" onClick={() => buy()}>Pay and Buy</button>
        </div>
    )
}

export default BuyPage