import React, { useState } from 'react';
import './navbar.css';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
  const [active, setActive] = useState('navBar');
  const history = useHistory();

  const showNav = () => {
    setActive('navBar activeNavbar');
  };

  const removeNavbar = () => {
    setActive('navBar');
  };

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    history.push('/');
  };

  return (
    <section className="navBarSection">
      <header className="header flex">
        <div className="logoDiv">
          <a href="#" className="logo flex">
            <h1>
              <MdOutlineTravelExplore className="icon" />Travel
            </h1>
          </a>
        </div>

        <div className={active}>
          <ul className="navLists horizontal">
            <li className="navItem">
              <a href="/" className="navLink">
                Home
              </a>
            </li>
            <li className="navItem">
              <a href="#" className="navLink">
                Packages
              </a>
            </li>
            <button className="btn" onClick={logoutHandler}>
              Logout
            </button>
            
            <div onClick={removeNavbar} className="closeNavbar">
              <AiFillCloseCircle className="icon" />
            </div>
          </ul>
        </div>

        <div onClick={showNav} className="toggleNavBar">
          <TbGridDots className="icon" />
        </div>
      </header>
    </section>
  );
};

export default Navbar;
