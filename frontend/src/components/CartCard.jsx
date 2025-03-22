function CartCard(props) {
    const handleRemoveFromCart = (index) => {
        var cart = JSON.parse(localStorage.getItem("cart"))
        cart.splice(index, 1)
        localStorage.setItem("cart", JSON.stringify(cart))
        window.location.reload(false)
    }

    return (
        <div className="card text-bg-dark">
            <img src={props.img} className="card-img-top" alt={props.name} style={{width: "50%", marginLeft: "auto", marginRight: "auto"}} />
            <hr />
            <div className="card-body">
                <h5 className="card-title">{props.company} {props.name}</h5>
                <p>{props.type}</p>
                <hr />
                <h3><i className="fa-solid fa-indian-rupee-sign"></i> {props.price}</h3>
                <button className="btn btn-danger" style={{width: "100%"}} onClick={() => handleRemoveFromCart(props.index)}>Remove from Cart</button>
            </div>            
        </div>
    )
}

export default CartCard