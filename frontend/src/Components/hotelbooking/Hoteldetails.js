import React, { useEffect, useState } from "react";
import "./HotelDetails.css";
import {
  HiOutlineClipboardCheck,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { useHistory } from "react-router-dom";

const Hoteldetails = () => {
  const history = useHistory();
  const [hotelData, setHotelData] = useState([]);
  useEffect(() => {
    fetch("/hotel")
      .then((response) => response.json())
      .then((data) => {
        const hotels = data.hotels;
        setHotelData(hotels);
        console.log(hotels);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  useEffect(() => {
    if (shouldRefresh) {
      window.location.reload();
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);
  const handleBookNowClick = (hotel_id) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      setTimeout(() => {
        setShouldRefresh(true);
        history.push(`/hotelbooking-details?hotel_id=${hotel_id}`);
      }, 1000);
    } else {
      localStorage.setItem(
        "intendedUrl",
        `/hotelbooking-details?hotel_id=${hotel_id}`
      );
      history.push("/login");
    }
  };

  return (
    <section className="main section">
      <div>
        <h2
          style={{ fontWeight: "900", fontSize: "1.5em", marginBottom: "5px" }}
        >
          Most visited destinations
        </h2>
      </div>
      <div className="secContent">
        {hotelData.map(({ hotel_id, hotel_name, location, roomprice }) => {
          return (
            <div key={hotel_id} className="singleDestination">
              <div className="cardInfo">
                <div className="continent">
                  <span className="name" style={{ fontWeight: "600" }}>
                    {/* Hotel id: {hotel_id} */}
                    <p style={{ fontWeight: "600" }}>
                      Hotel name: {hotel_name}
                    </p>
                    <p style={{ fontWeight: "600" }}>
                      Location:{" "}
                      <HiOutlineLocationMarker
                        className="icon"
                        style={{ display: "inline", fontSize: "1.2em" }}
                      />{" "}
                      {location}
                    </p>
                  </span>
                </div>

                <div className="desc">
                  <p style={{ fontWeight: "600" }}>
                    Room tariff: {"\u20B9"}
                    {roomprice}
                  </p>
                </div>
                <button
                  className="btn flex"
                  onClick={() => handleBookNowClick(hotel_id)}
                >
                  BOOK NOW
                  <HiOutlineClipboardCheck className="icon" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Hoteldetails;
