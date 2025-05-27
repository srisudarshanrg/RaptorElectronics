import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom";

function AmountPage() {
    const { developmentBackendLink, productionBackendLink } = useOutletContext();
    const [user, setUser] = useState({});
    const [amountSpent, setAmountSpent] = useState(0);
    const [itemPrices, setItemPrices] = useState([]);
    const [length, setLength] = useState(0);

    useEffect(() => {
        var userRecieved = JSON.parse(sessionStorage.getItem("user"))
        setUser(userRecieved)
        setAmountSpent(999999999 - userRecieved.amount)

        var payload = {
            id: user.id,
        }
        const headers = {
            "Content-Type": 'application/json',
        }
        const requestOptions = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        }
        fetch(`${developmentBackendLink}amount`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
                }
                setLength(data.length)
                setItemPrices(data.item_prices)
            })
            .catch((error) => console.log(error))
    }, [])



    return (
        <div>
            {length > 0 &&
                itemPrices.map((i) => (
                    <div>
                        
                    </div>
                ))
            }
        </div>
    )
}

export default AmountPage