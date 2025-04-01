import { Link } from "react-router-dom"

function YourItemCard(props) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text" style={{textTransform: "uppercase"}}>{props.type}</p>
                <hr />
                <h5><i className="fa-solid fa-indian-rupee-sign"></i> {props.price}</h5>
            </div>
            <div className="card-footer">
                <Link to={`/product/${props.type}/${encodeURIComponent(props.name)}`}>See Item</Link>
            </div>
        </div>
    )
}

export default YourItemCard