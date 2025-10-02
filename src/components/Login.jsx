import { useEffect, useState } from "react";
import { useLocation , useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const location = useLocation();
    const navigate = useNavigate();

    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("http://localhost:5000/users"); // backend endpoint
                console.log("Response data:", res.data);
                setUsers(res.data);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };
        fetchUsers();
    }, []);

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleOnSubmit = (e) => {
        e.preventDefault(); // to prevent the reload of the page.
        console.log(formData);
        console.log(users);
        const foundUser = users.find(
            u => u.username === formData.username && u.password === formData.password
        )
        if(foundUser) {
            alert("successfully logged in");

            navigate("/home" , {
                state : {username: foundUser.username} , 
                replace: true
            });    // passing the state object to keep track of the params needed.

            localStorage.setItem("auth" , "true"); 
            // this will mark me logged in. and will not redirect back again.
        } else{
            alert("incorrect password");

            navigate("/" , {replace: true});
        }
    }
    return <>
        <form onSubmit={handleOnSubmit}> {/*in react, the onSubmit button handler will come here.*/}
            <div>
                <label htmlFor="username"></label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleOnChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="password"></label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleOnChange}
                    required
                />
            </div>

            <button
                type="submit"
                required
            > Submit </button>
        </form>
    </>
}

export default Login;