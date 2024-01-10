import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { MdOutlineTravelExplore } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@chakra-ui/react";
// const Navbar = () => {
//   const [active, setActive] = useState('navBar');
//   const history = useHistory();

//   const showNav = () => {
//     setActive('navBar activeNavbar');
//   };

//   const removeNavbar = () => {
//     setActive('navBar');
//   };
//  const user = JSON.parse(localStorage.getItem('userInfo'));
//   const logoutHandler = () => {
//     localStorage.removeItem('userInfo');
//     history.push('/');
//     window.location.reload();
//   };

//   return (
//     <section className="navBarSection">
//       <header className="header flex">
//         <div className="logoDiv">
//           <a href="#" className="logo flex">
//             <h1>
//               <MdOutlineTravelExplore className="icon" />Travel
//             </h1>
//           </a>
//         </div>

//         <div className={active}>
//           <ul className="navLists horizontal">
//             <li className="navItem">
//               <a href="/" className="navLink">
//                 Home
//               </a>
//             </li>
//             {user ? (
//               <li className="navItem">
//             <Link to="/booked-tours" className="navLink">
//               Packages
//             </Link>
//           </li>
//             ) : (
//               <div></div>
//             )}
//             {user ? (
//               <button className="btn" onClick={logoutHandler}>
//                 Logout
//               </button>
//             ) : (
//               <button className="btn" onClick={() => history.push('/login')}>
//                 Login/Register
//               </button>
//             )}

//             <div onClick={removeNavbar} className="closeNavbar">
//               <AiFillCloseCircle className="icon" />
//             </div>
//           </ul>
//         </div>

//         <div onClick={showNav} className="toggleNavBar">
//           <TbGridDots className="icon" />
//         </div>
//       </header>
//     </section>
//   );
// };

// export default Navbar;

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const history = useHistory();
  const toggleMenu = () => {
    setIsActive(!isActive);
  };
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
    window.location.reload();
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
            <a href="/">Home</a>
          </li>
          {user && (
            <li>
              <a href="/booked-tours">My Bookings</a>
            </li>
          )}
          <li>
            <a href="#">About</a>
          </li>
          <li>
            {user ? (
              <button className="button" onClick={logoutHandler}>
                Logout
              </button>
            ) : (
              <button onClick={() => history.push("/login")}>
                Login/Register
              </button>
            )}
          </li>
          {user && (
            <li>
              <a href="/profile">My Profile</a>
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
