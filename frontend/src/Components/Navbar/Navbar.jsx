import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { MdOutlineTravelExplore } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@chakra-ui/react";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const toggleMenu = () => {
    setIsActive(!isActive);
  };
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
    window.location.reload();
  };
  const isHomePage = location.pathname === "/";
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [isSmallScreen] = useMediaQuery("(max-width: 800px)");
  return (
    <nav className="navbar">
      <div
        style={{ marginLeft: isSmallScreen ? "40%" : "45%", fontSize: "1.7em" }}
      >
        <h1>Trip-Trekker</h1>
      </div>
      <div className="container">
        <div className="logo">
          <a href="#">
            {" "}
            <h1>
              <MdOutlineTravelExplore
                className="icon"
                style={{ display: "inline" }}
              />
              Travel{" "}
            </h1>
          </a>
        </div>
        <ul className={isActive ? "nav-links active" : "nav-links"}>
          <li>
            <Link to="/">Home</Link>
          </li>
          {user && (
            <li>
              <Link to="/booked-tours">My Bookings</Link>
            </li>
          )}
          {isHomePage && (
            <li>
              <button className="button" onClick={scrollToAbout}>
                About
              </button>
            </li>
          )}
          <li>
            {user ? (
              <button className="button" onClick={logoutHandler}>
                Logout
              </button>
            ) : (
              <button className="button" onClick={() => history.push("/login")}>
                Login/Register
              </button>
            )}
          </li>
          {user && (
            <li>
              <Link to="/profile">My Profile</Link>
            </li>
          )}
        </ul>
        <div className="toggle-button" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
