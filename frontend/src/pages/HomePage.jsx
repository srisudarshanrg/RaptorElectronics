import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../static/styles/HomePage.css"

function HomePage() {
    const { developmentBackendLink, productionBackendLink, user, loggedIn, setLoggedIn, } = useOutletContext();

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

        fetch(`${developmentBackendLink}`, requestOptions)
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
            <div className="laptops product-category">
                <h1 style={{textAlign: "center"}}>Laptops</h1>
                <br />
                <div className="product-row">
                    {laptops.map((laptop) => {
                        const info = (
                            <div>
                                <table className="table table-striped table-dark">
                                    <thead className="">
                                        <tr>
                                        <td>Feature</td>
                                        <td>Value</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Processor</td>
                                            <td>{laptop.processor}</td>
                                        </tr>
                                        <tr>
                                            <td>RAM</td>
                                            <td>{laptop.ram} GB</td>
                                        </tr>
                                        <tr>
                                            <td>Storage</td>
                                            <td>{laptop.storage} GB</td>
                                        </tr>
                                    </tbody>                                
                                </table>
                            </div>
                        )
                        return (
                            <div key={laptop.id} className="product-col">
                                <ProductCard
                                    id={laptop.id}
                                    name={`${laptop.company} ${laptop.name}`}
                                    img={laptop.image_link}
                                    info={info}
                                    price={laptop.price}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>

            <hr />

            <h2>Monitors</h2>
            {monitors.map((monitor) => (
                <p key={monitor.id}>{monitor.name}</p>
            ))}

            <hr />

            <h2>Keyboards</h2>
            {keyboards.map((keyboard) => (
                <p key={keyboard.id}>{keyboard.name}</p>
            ))}

            <hr />

            <h2>Mouses</h2>
            {mouses.map((mouse) => (
                <p key={mouse.id}>{mouse.name}</p>
            ))}
        </>
    );
}

export default HomePage;