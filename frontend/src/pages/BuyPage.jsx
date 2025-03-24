import { useEffect, useState } from "react";
import { useOutletContext, useRouteLoaderData } from "react-router-dom"

function BuyPage() {
    const { developmentBackendLink, productionBackendLink, navigate, setErrorAlert, errorAlert } = useOutletContext();
    
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
            setErrorAlert("Cannot buy products as total cost is more than the amount you have")
            return
        }

        var userItems = JSON.parse(localStorage.getItem("userItems"))

        userItems.push(cartRecieved)

        localStorage.setItem("userItems", JSON.stringify(userItems))
        var newCart = []
        localStorage.setItem("cart", JSON.stringify([]))
        var newUser = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "password": user.password,
            "join_date": user.join_date,
            "amount": new_amount,
            "created_at": user.created_at,
            "updated_at": user.updated_at,
        }
        sessionStorage.setItem("user", JSON.stringify(newUser))

        window.location.reload(true)
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