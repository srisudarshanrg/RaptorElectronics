import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import YourItemCard from "../components/YourItemCard";

function YourItems() {
    const { developmentBackendLink, productionBackendLink, navigate, setErrorAlert } = useOutletContext();
    const [ items, setItems ] = useState([]);
    const [ length, setLength ] = useState();

    var user = JSON.parse(sessionStorage.getItem("user"))

    useEffect(() => {
        if (user === null) {
            setErrorAlert(["Login first to view your items"])
            navigate("/login")
            return
        }
        var payload = {
            user_id: user.id,
        }
        const headers = {
            "Content-Type": "application/json",
        }
        const requestOptions = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
        }
        fetch(`${developmentBackendLink}bought-items`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setLength(data.length)
                setItems(data.items);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    console.log(length)

    return (
        <div style={{padding: "2%"}}>
            <h1>Your Items</h1>
            <hr />
            {length === 0 
            ?   <h1>No items bought</h1>
            :   
                <div className="row">
                    {items.map((item, index) => (
                        <div key={index} className="col-lg-4 col-md-4 col-sm-12 col-xs-12" style={{padding: "2%"}}>
                            <YourItemCard
                                name={item.item_name}
                                type={item.item_type}
                                price={item.price}
                            />
                        </div>
                    ))}
                </div>
            }
            
        </div>
    )
}

export default YourItems