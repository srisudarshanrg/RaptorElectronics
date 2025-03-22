import { useOutletContext } from "react-router-dom"

function ProductCard(props) {
    const { navigate, addedToCart, setAddedToCart, newCartItemName, setNewCartItemName } = useOutletContext();

    const handleBuy = (id, name, type) => {
        var cart = JSON.parse(localStorage.getItem("cart"))
        if (cart === null ) {
            console.log("pushing item to cart")
            var cartNew = [{id: id, type: type}]
            localStorage.setItem("cart", JSON.stringify(cartNew))
        } else {
            console.log("pushing item to cart already exists")
            cart.push({id: id, type: type})
            localStorage.setItem("cart", JSON.stringify(cart))
        }
        setAddedToCart(true)
        setNewCartItemName(props.name)      
        setTimeout(() => {
            setAddedToCart(false);
            setNewCartItemName("")
        }, 3000)
    }

    return (
        <div className="card text-bg-dark" style={{width: "20rem"}}>
            <img src={props.img} className="card-img-top" alt={props.name} style={{width: "50%", marginLeft: "auto", marginRight: "auto"}} />
            <hr />
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <div className="card-text">{props.info}</div>
                <h3><i className="fa-solid fa-indian-rupee-sign"></i> {props.price}</h3>
                <button onClick={() => handleBuy(props.id, props.name, props.type)} href="#" className="btn btn-primary"><i className="fa-solid fa-cart-shopping"></i> Add to Cart</button>
            </div>
        </div>
    )
}

export default ProductCard