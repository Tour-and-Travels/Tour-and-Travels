import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <footer className="footer" id="about">
      <div className="about-section">
        <h2>
          <u>About</u>
        </h2>
        <p>
          <FontAwesomeIcon icon={faGlobe} className="globe" />
          Trip-Trekker is a software engineering project in the field of tour
          and travels developed by our team. Our team members include Ankan
          Kumar Mitra, Varun Singh, Arkadipta Paul and Anuj Kumar Yadav. The
          project is built using React and Node.js offering features such as
          tour booking.
        </p>
      </div>
      {/* </div> */}
      <div className="links-section">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/Flight">Flight</a>
          </li>
          <li>
            <a href="/tour">Tour</a>
          </li>
          <li>
            <a href="/packages">Packages</a>
          </li>
        </ul>
        <div className="contact">
          <a href="mailto:ankankrmitra100@gmail.com">
            Mail&nbsp;&nbsp;
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
          <br />
          <div style={{ display: "inline", verticalAlign: "middle" }}>
            <a
              href="https://github.com/Tour-and-Travels/Tour-and-Travels.git"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source code&nbsp;
              <FontAwesomeIcon icon={faGithub} />
              {/* <AiOutlineGithub style={{ verticalAlign: "middle" }} /> */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
