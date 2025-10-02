import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Location from "./components/Location";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const isAuthenticated = localStorage.getItem("auth");
  return (
    <>
      <BrowserRouter>   
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/location/:id" element={<Location />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
