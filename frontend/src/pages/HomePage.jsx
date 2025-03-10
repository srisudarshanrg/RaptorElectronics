import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function HomePage() {
    const { developmentBackendLink, productionBackendLink } = useOutletContext();

    const [laptops, setLaptops] = useState([]);
    const [monitors, setMonitors] = useState([]);
    const [keyboards, setKeyboards] = useState([]);
    const [mouses, setMouses] = useState([]);

    useEffect(() => {
        const headers = {
            "Content-Type": "application/json",
        }

        const requestOptions = {
            method: "GET",
            headers: headers,
        }

        fetch(`${productionBackendLink}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setLaptops(data.laptops);
                setMonitors(data.monitors);
                setKeyboards(data.keyboards);
                setMouses(data.mouses);

                console.log("data fetched");
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