import { useOutletContext } from "react-router-dom";

function ProductInfoCard(props) {
    const { navigate, addedToCart, setAddedToCart, newCartItemName, setNewCartItemName } = useOutletContext();

    const handleBuy = (id, name, type, price) => {
        var cart = JSON.parse(localStorage.getItem("cart"))
        if (cart === null ) {
            console.log("pushing item to cart")
            var cartNew = [{id: id, type: type, name: name, price: price}]
            localStorage.setItem("cart", JSON.stringify(cartNew))
        } else {
            console.log("pushing item to cart already exists")
            cart.push({id: id, type: type, name: name, price: price})
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
        <div className="product-info-card row" style={{width: "100%", border: "3px solid rgb(100, 100, 100)", padding: "2%", borderRadius: "15px", fontFamily: "Work Sans, sans-serif"}}>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <img src={props.img} alt={props.name} style={{width: "100%"}} />
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <p><b>Name:</b> {props.company} {props.name}</p>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <td>Feature</td>
                            <td>Value</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr></tr>
                        {Object.entries(props.info).map(([key, value], index) => (
                            <tr key={index}>
                                <td>{key}</td>
                                <td>{value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <hr />

                <h5 className="card-title"><i className="fa-solid fa-indian-rupee-sign"></i> {props.price}</h5>

                <hr />

                <button onClick={() => handleBuy(props.id, props.name, props.type, props.price)} className="btn btn-primary">Add to Cart</button>
            </div>
        </div>
    )
}

export default ProductInfoCard