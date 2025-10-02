import React, { useState, useEffect } from "react";
import {useNavigate , replace } from "react-router-dom";
import axios from "axios";
import "../CSS/Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    dob: "",
  });

  const [message, setMessage] = useState("");
  const [existingUsers, setExistingUsers] = useState([]);

  const navigate = useNavigate();

  // Fetch all usernames from backend on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users"); // backend endpoint
        setExistingUsers(res.data.map((user) => user.username));
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if username already exists
    if (existingUsers.includes(formData.username)) {
      setMessage("Username already exists!");
      return; // do not submit
    }

    try {
      const res = await axios.post("http://localhost:5000/signup", formData);
      setMessage(res.data.message || "Signup successful");
      setFormData({ username: "", password: "", dob: "" }); // clear form on success
      setExistingUsers([...existingUsers, formData.username]); // update local list

      alert("successfully signed up");
      navigate("/" , {replace: true});
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Signup failed"); // show backend error
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-heading">Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            name="dob"
            id="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>

      {message && <p style={{ color: "black" }}>{message}</p>}
    </div>
  );
};

export default Signup;
