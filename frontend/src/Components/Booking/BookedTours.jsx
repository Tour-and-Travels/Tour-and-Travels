import React, { useEffect, useState } from "react";
import "./BookedTours.css"; // Import your CSS file for styling
import { Button, useMediaQuery } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const BookedTours = () => {
  const [bookedTours, setBookedTours] = useState([]);
  const user = JSON.parse(localStorage.getItem("userInfo")).user;
  const [isSmallScreen] = useMediaQuery("(max-width: 400px)");
  const history = useHistory();
  const fetchBooking = (userId) => {
    fetch(`/booking/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const booking = data.booking;
        setBookedTours(booking);
      })
      .catch((error) => console.error("Error fetching booked tours:", error));
  };
  const [shouldRefresh, setShouldRefresh] = useState(false);
  useEffect(() => {
    if (shouldRefresh) {
      window.location.reload();
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);
  useEffect(() => {
    if (user) {
      fetchBooking(user.user_id);
    } else {
      console.error("User information not available");
    }
  }, []);

  const handleUpdateBooking = (bookingId, tourId) => {
    console.log("Updating booking:", bookingId);
    setTimeout(() => {
      setShouldRefresh(true);
      history.push(`/update-booking?booking_id=${bookingId}&tour_id=${tourId}`);
    }, 1000);
  };

  const handleCancelBooking = (bookingId) => {
    fetch(`/booking/cancel/${bookingId}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBookedTours((prevBookedTours) =>
          prevBookedTours.map((booking) =>
            booking.booking_id === bookingId
              ? { ...booking, booking_status: 0 }
              : booking
          )
        );
      })
      .catch((error) => console.error("Error cancelling booking:", error));
  };

  return (
    <div>
      <h1 className="booked-tours-heading">Booked Tours</h1>
      <div className="booked-tours-container">
        {bookedTours.map(
          ({
            booking_id,
            user_id,
            tour_id,
            people,
            amount,
            booking_date,
            booking_status,
            hotel_id,
            hotel_name,
            location,
            name,
            email,
            phone_no,
          }) => (
            <div key={booking_id} className="booking-card">
              <div className="booking-details">
                <p>Booking ID: {booking_id}</p>
                <p>User ID: {user_id}</p>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <p>Phone No: {phone_no}</p>
                <p>Tour ID: {tour_id}</p>
                <p>Hotel ID: {hotel_id}</p>
                <p>Hotel Name: {hotel_name}</p>
                <p>Location: {location}</p>
                <p>Number of People: {people}</p>
                <p>
                  Amount Paid: {"\u20B9"} {amount}
                </p>
                <p>Booking Date: {booking_date.split("T")[0]}</p>
              </div>
              <div className="booking-actions">
                {booking_status === 1 ? (
                  <div className="success-status">
                    Booking Status: Confirmed
                  </div>
                ) : (
                  <div className="cancelled-status">
                    Booking Status: Cancelled
                  </div>
                )}
                {booking_status === 1 && (
                  <Button
                    mb="1"
                    bg="#1eff00a3"
                    _hover={{
                      boxShadow: "none",
                      transition: "none",
                    }}
                    onClick={() => handleUpdateBooking(booking_id, tour_id)}
                  >
                    Update Booking
                  </Button>
                )}
                <Button
                  mb="1"
                  bg="#ff0000"
                  color="white"
                  _hover={{
                    boxShadow: "none",
                    transition: "none",
                  }}
                  onClick={() => handleCancelBooking(booking_id)}
                >
                  Cancel Booking
                </Button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BookedTours;
