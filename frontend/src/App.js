import React, { useEffect, useState } from "react";
import "./root.scss";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Service from "./Pages/Service";
import NavBar from "./Components/NavBar";
import logo from "./Images/logo-removebg-preview.png";
import Account from "./Pages/Account";
import { NavContext } from "./misc/context";

const App = () => {
  const routePath = useLocation();
  const [currentPath, setCurrentPath] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  useEffect(() => {
    setCurrentPath(routePath.pathname);
  }, [routePath]);

  const userData = JSON.parse(localStorage.getItem("USER"));
  const lastEntry = userData
    ? { to: "/profile", text: "Profile" }
    : { to: "/account", text: "Account" };

  const [navLinks, setNavLinks] = useState([
    { to: "/", text: "Home" },
    { to: "/about", text: "About" },
    { to: "/contact", text: "Contact" },
    { to: "/service", text: "Service" },
    { ...lastEntry },
  ]);

  return (
    <>
      <NavContext.Provider
        value={{ navLinks, setNavLinks, userLocation, setUserLocation }}
      >
        <div className="main_logo">
          <img className="logo" src={logo} alt="logo" />
        </div>
        <NavBar currentPath={currentPath} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/account/*" element={<Account />} />
        </Routes>
      </NavContext.Provider>
    </>
  );
};

export default App;
