import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom"
import ProductInfoCard from "../components/ProductInfoCard";

function ItemPage() {
    const { developmentBackendLink, productionBackendLink } = useOutletContext();
    const { type, name } = useParams();
    const [ item, setItem ] = useState();
    const [itemInfo, setItemInfo] = useState({});

    const decodedName = decodeURIComponent(name);

    console.log(type)

    useEffect(() => {
        var payload = {
            type: type,
            name: decodedName,
        }
        const headers = {
            "Content-Type": "application/json",
        }
        const requestOptions = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
        }
        fetch(`${developmentBackendLink}product-info`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setItem(data.item);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    console.log(item)

    useEffect(() => {
        if (item !== undefined) {
            var info
            switch (type) {
                case "laptops":
                    info = {
                        "Processor": item.processor,
                        "RAM": item.ram,
                        "Storage": item.storage,
                        "Display": item.display,
                    }
                    break
                case "monitors":
                    info = {
                        "Resolution": item.resolution,
                        "Size": item.size + "inches",
                    }
                    break
                case "keyboards":
                    var rgb_lighting

                    item.rgb_lighting === true ? rgb_lighting = (<i className="fa-solid fa-check text-success"></i>) : rgb_lighting = (<i className="fa-solid fa-xmark text-danger"></i>)

                    info = {
                        "Number of Keys": item.number_keys,
                        "Type": item.type,
                        "Color": item.color,
                        "RGB Lighting": rgb_lighting,
                    }
                    break
                case "mouses":
                    var silent_clicking
                    var gaming
                    var rgb_lighting
                    item.silent_clicking === true ? silent_clicking = (<i className="fa-solid fa-check text-success"></i>) : silent_clicking = (<i className="fa-solid fa-xmark text-danger"></i>)
                    item.gaming === true ? gaming = (<i className="fa-solid fa-check text-success"></i>) : gaming = (<i className="fa-solid fa-xmark text-danger"></i>)
                    item.rgb_lighting === true ? rgb_lighting = (<i className="fa-solid fa-check text-success"></i>) : rgb_lighting = (<i className="fa-solid fa-xmark text-danger"></i>)
    
                    info = {
                        "Silent Clicking": silent_clicking,
                        "Gaming": gaming,
                        "RGB Lighting": rgb_lighting,
                        "Color": item.color,
                    }
                    break
                default:
                    info = {}
            }
            
            setItemInfo(info)
        }
    }, [item, type])

    return (
        <div style={{display: "flex", padding: "3%", justifyContent: "center"}}>
            {item !== undefined &&
                <ProductInfoCard
                    id={item.id}
                    name={item.name}
                    company={item.company}
                    img={item.image_link}
                    info={itemInfo}
                    price={item.price}
                    type={type}
                />
            }
        </div>
    )
}

export default ItemPage