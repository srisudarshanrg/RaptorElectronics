import { useEffect, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";

function HomePage() {
    const developmentBackendLink = "http://localhost:2400/";
    const productionBackendLink = "https://raptorelectronics-production.up.railway.app/";
    // const developmentBackendLink = useOutletContext();
    // const productionBackendLink = useOutletContext();
    console.log(developmentBackendLink)

    const [laptops, setLaptops] = useState([]);

    useEffect(() => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: headers,
        }

        fetch(`${productionBackendLink}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.laptops && data.laptops !== null) {
                    setLaptops(data.laptops)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <>
            <h1>This is the home page</h1>
            {laptops.map((laptop) => (
                <p key={laptop.id}>{laptop.model_name}</p>
            ))}
        </>
    );
}

export default HomePage;