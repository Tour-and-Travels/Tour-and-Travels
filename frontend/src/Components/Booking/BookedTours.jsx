import React, { useEffect, useState } from "react";

const BookedTours = () => {
  const [bookedTours, setBookedTours] = useState([]);
  const user = JSON.parse(localStorage.getItem("userInfo")).user;
  console.log(user.user_id);
  const fetchBooking = (userId) => {
    fetch(`/booking/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const booking = data.booking;
        setBookedTours(booking);
        console.log(booking);
      })
      .catch((error) => console.error("Error fetching booked tours:", error));
  };
  useEffect(() => {
    if (user) {
      fetchBooking(user.user_id);
    } else {
      console.error("User information not available");
    }
  }, []);

  return (
    <div>
      <h1>Booked Tours</h1>
      <div>
        {bookedTours.map(
          ({ booking_id, user_id, tour_id, people, amount, booking_date }) => {
            return (
              <div key={booking_id}>
                <div>
                  <div>
                    <p>booking id: {booking_id}</p>
                    <p>User id: {user_id}</p>
                    <p>tour id: {tour_id}</p>
                    <p>number of people: {people}</p>
                    <p>
                      Amount paid: {"\u20B9"} {amount}
                    </p>
                    <p>Booking Date: {booking_date.split("T")[0]}</p>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default BookedTours;
