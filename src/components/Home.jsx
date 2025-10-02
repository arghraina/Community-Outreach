import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from "axios";
import "../CSS/Home.css"
const Home = ()=>{

    const location = useLocation(); // To read the state object, which I passed in the useNavigate().
    const navigate = useNavigate();

    const [locations , setLocations] = useState([]);

    useEffect(()=>{
        const fetchLocations = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/locations"); 
                console.log("Response data:", res.data);
                setLocations(res.data);
            } catch (err) {
                console.error("Error fetching locations", err);
            }
        };
        fetchLocations();
    } , []);

    const handleLocationClick = (id , img , name) => {
        console.log(img);
        navigate(`/location/${id}` , {state: {img: img , name: name}}); // navigate to location page
    };

    const handleOnSubmit = ()=>{
        navigate("/" , {replace : true});   // prevent coming back to the current page after logout.
        localStorage.removeItem("auth");
    }   
    return(  <div className="body">
        <div className = "header">
            <img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwC3miSWiHS2F24amwhHLoR8ozgkjbuWLUzA&s"></img>
            <span className="head2">Weclome {location.state.username}</span>
            <button onClick = {handleOnSubmit} className="logout">
                Log Out
            </button>
        </div>
        <div className="container">
            <h2 className="title">Mussoorie - The Queen of Hills</h2>
            <div className="content">
            Mussoorie, nestled in the foothills of the Garhwal Himalayas, is one of India’s most famous hill stations. Located in Uttarakhand, about 35 km from Dehradun, it stands at an altitude of 6,170 ft (1,880 m) and offers breathtaking views of the Doon Valley and the snow-capped Shivalik ranges.<br></br>
           <span style={{fontSize: "35px", color:"black" , fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"}}> A Glimpse of History: </span><br></br>
Founded in 1823 by a British officer, Captain Young, Mussoorie soon became a popular summer retreat during the colonial era.

Its name is believed to be derived from the local shrub ‘Mansoor’ found in the area.

Known as the “Queen of Hills”, it attracted writers, leaders, and travelers, including Ruskin Bond, who still resides here.
            </div>
        </div>
        <div className="spots">
            <p style = {{fontSize : "30px" , marginTop:"10px" , textDecoration:"underline"}}>Tourist Spots:</p>
            <ul>
                {locations.map((loc)=>(<li key={loc.id} onClick = {()=>handleLocationClick(loc.id , loc.img , loc.location)}>{loc.location}</li>))}
            </ul>
        </div>
    </div>
    )
}

export default Home;