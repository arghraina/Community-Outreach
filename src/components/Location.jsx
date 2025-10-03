import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";  // v2+ import
import "../CSS/Location.css";

const Location = () => {
    const { id } = useParams();
    const [vendors, setVendors] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/location/${id}`);
                const data = await res.json();
                setVendors(data);
            } catch (err) {
                console.error("Failed to fetch vendors:", err);
            }
        };
        fetchVendors();
    }, [id]);

    return (
        <div id="container">
            <img src={location.state?.img} alt={`Location ${id}`} />

            <div className="containerLocation">
                <h2 className="locHead">Vendors at {location.state.name}</h2>
                {vendors.length === 0 ? (
                    <p>No vendors found for this location.</p>
                ) : (
                    <ul className="locULcont">
                        {vendors.map((vendor) => {
                            const lat = parseFloat(vendor.latitude);
                            const lng = parseFloat(vendor.longitude);
                            const mapsUrl =
                                !isNaN(lat) && !isNaN(lng)
                                    ? `https://www.google.com/maps?q=${lat},${lng}`
                                    : null;

                            return (
                                <li key={vendor._id} style={{ fontSize: "17px", fontWeight:"inherit" ,color:"black" , marginBottom: "1rem" }}>
                                    <h3>{vendor.name}</h3>
                                    <p>{vendor.description}</p>
                                    <p><span style={{textDecoration:"underline",color:"aquamarine" , fontWeight:"bolder", fontSize: "18px"}}>Location:</span> {vendor.location}<br></br><a style={{color: "blue" , textDecoration:"underline"}}href={`${mapsUrl}`} target="_blank">{`${mapsUrl}`}</a></p>
                                    <p style={{textDecoration:"underline",color:"#e2ff7f" , fontWeight:"bolder", fontSize: "18px"}}>Scan to get Directions:</p>
                                    {mapsUrl && <QRCodeCanvas value={mapsUrl} size={128} />}
                                    <hr></hr>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Location;
