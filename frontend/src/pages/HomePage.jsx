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
        <div className="home">
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
                                    type="laptops"
                                />
                            </div>
                        )
                    })}
                </div>
            </div>

            <hr />

            <div className="monitors product-category">
                <h1 style={{textAlign: "center"}}>Monitors</h1>
                <br />
                <div className="product-row">
                    {monitors.map((monitor) => {
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
                                            <td>Resolution</td>
                                            <td>{monitor.resolution}</td>
                                        </tr>
                                        <tr>
                                            <td>Size</td>
                                            <td>{monitor.size} inches</td>
                                        </tr>
                                    </tbody>                                
                                </table>
                            </div>
                        )
                        return (
                            <div key={monitor.id} className="product-col">
                                <ProductCard
                                    id={monitor.id}
                                    name={`${monitor.company} ${monitor.name}`}
                                    img={monitor.image_link}
                                    info={info}
                                    price={monitor.price}
                                    type="monitors"
                                />
                            </div>
                        )
                    })}
                </div>
            </div>

            <hr />

            <div className="keyboards product-category">
                <h1 style={{textAlign: "center"}}>Keyboards</h1>
                <br />
                <div className="product-row">
                    {keyboards.map((keyboard) => {
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
                                            <td>Type</td>
                                            <td>{keyboard.type}</td>
                                        </tr>
                                        <tr>
                                            <td>Number of Keys</td>
                                            <td>{keyboard.number_keys}</td>
                                        </tr>
                                        <tr>
                                            <td>Color</td>
                                            <td>{keyboard.color}</td>
                                        </tr>
                                        <tr>
                                            <td>RGB Lighting</td>
                                            {keyboard.rgb_lighting ? (<td className="text-success"><i className="fa-solid fa-check"></i></td>) 
                                            : (<td className="text-danger"><i className="fa-solid fa-xmark"></i></td>)}
                                        </tr>
                                    </tbody>                                
                                </table>
                            </div>
                        )
                        return (
                            <div key={keyboard.id} className="product-col">
                                <ProductCard
                                    id={keyboard.id}
                                    name={`${keyboard.company} ${keyboard.name}`}
                                    img={keyboard.image_link}
                                    info={info}
                                    price={keyboard.price}
                                    type="keyboards"
                                />
                            </div>
                        )
                    })}
                </div>
            </div>

            <hr />

            <div className="mouses product-category">
                <h1 style={{textAlign: "center"}}>Mouses</h1>
                <br />
                <div className="product-row">
                    {mouses.map((mouse) => {
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
                                            <td>SilentClicking</td>
                                            {mouse.silent_clicking ? (<td className="text-success"><i className="fa-solid fa-check"></i></td>) 
                                            : (<td className="text-danger"><i className="fa-solid fa-xmark"></i></td>)}
                                        </tr>
                                        <tr>
                                            <td>Gaming</td>
                                            {mouse.gaming ? (<td className="text-success"><i className="fa-solid fa-check"></i></td>) 
                                            : (<td className="text-danger"><i className="fa-solid fa-xmark"></i></td>)}
                                        </tr>
                                        <tr>
                                            <td>RGB Lighting</td>
                                            {mouse.rgb_lighting ? (<td className="text-success"><i className="fa-solid fa-check"></i></td>) 
                                            : (<td className="text-danger"><i className="fa-solid fa-xmark"></i></td>)}
                                        </tr>
                                        <tr>
                                            <td>Color</td>
                                            <td>{mouse.color}</td>
                                        </tr>
                                    </tbody>                                
                                </table>
                            </div>
                        )
                        return (
                            <div key={mouse.id} className="product-col">
                                <ProductCard
                                    id={mouse.id}
                                    name={`${mouse.company} ${mouse.name}`}
                                    img={mouse.image_link}
                                    info={info}
                                    price={mouse.price}
                                    type="mouses"
                                />
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    );
}

export default HomePage;