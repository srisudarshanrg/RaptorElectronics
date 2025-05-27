import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"

function LaptopsPage() {
    const [developmentBackendLink, productionBackendLink] = useOutletContext();

    useEffect(() => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify("laptops")
        }
        fetch(`${developmentBackendLink}single-product-type`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.error) {
                    console.log(data.error)
                }
            })
    }, [])

    return (
        <>
            <h1>This is the laptops page</h1>
        </>
    )
}

export default LaptopsPage