// main.jsx

import React, { useEffect, useState } from 'react';
import './main.css';
import { HiOutlineClipboardCheck, HiOutlineLocationMarker } from 'react-icons/hi';

const Main = () => {
  const [tourData, setTourData] = useState([]);

  useEffect(() => {
    // Fetch tour data from the backend
    fetch('/tour') // Replace with your backend URL
      .then((response) => response.json())
      .then((data) => {
        const tours = data.tours;
        setTourData(tours);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const arrayBufferToBase64 = (buffer) => {
    const binary = Array.from(new Uint8Array(buffer))
      .map((byte) => String.fromCharCode(byte))
      .join('');
    return btoa(binary);
  };

  return (
    <section className="main container section">
      <div className="secTitle">
        <h3 className="title">Most visited destinations</h3>
      </div>

      <div className="secContent">
        {tourData.map(({ tour_id, image, category, hotel_id, description, Tagline, Price, Duration, Starting_date, Ending_date }) => {
          const imageUrl = `data:image/jpeg;base64,${arrayBufferToBase64(image.data)}`;

          return (
            <div key={tour_id} className="singleDestination">
              <div className="imageDiv">
                <img src={imageUrl} alt={image.data} />
              </div>

              <div className="cardInfo">
                <h4 className="destTitle">{category}</h4>
                <div className="continent">
                  <HiOutlineLocationMarker className="icon" />
                  <span className="name">{hotel_id}</span>
                </div>

                <div className="desc">
                  <p>{description}</p>
                  <p>{Tagline}</p>
                  <p>Price per person: {Price}</p>
                  <p>Duration: {Duration}</p>
                  <p>Starting Date: {Starting_date}</p>
                  <p>Ending Date: {Ending_date}</p>
                </div>

                <button className="btn flex">
                  DETAILS <HiOutlineClipboardCheck className="icon" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Main;
