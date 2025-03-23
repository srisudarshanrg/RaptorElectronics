import { useEffect } from "react";
import { useOutletContext } from "react-router-dom"

function BuyPage() {
    const { developmentBackendLink, productionBackendLink, navigate, setErrorAlert, errorAlert } = useOutletContext();

    useEffect(() => {
        var user = sessionStorage.getItem("user")
        if (user === null) {
            navigate("/login")
            var errors = errorAlert
            errors.push("You need to login first to be able to buy a product")
        }
        var cart = JSON.parse(localStorage.getItem("cart"))

        var totalCost = 0;
        cart.forEach((c) => {
            totalCost += c.price
        })
    })

    return (
        <>
            
        </>
    )
}

export default BuyPage