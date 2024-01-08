import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HiOutlineClipboardCheck, HiOutlineLocationMarker } from 'react-icons/hi';

const BookedTours = () => {
  const history = useHistory();
  const [bookedTours, setBookedTours] = useState([]);
  const [tourDetails, setTourDetails] = useState(null);
  const user = JSON.parse(localStorage.getItem('userInfo')).user;
  console.log(user.user_id);

  useEffect(() => {
    if (user) {
      fetch(`/booking/${user.user_id}`) // Replace with your backend URL
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch booked tours');
          }
          return response.json();
        })
        .then((data) => {
          setBookedTours(data.bookedTours);
        })
        .catch((error) => console.error('Error fetching booked tours:', error));
    } else {
      // Handle the case when user or user.userId is not available
      console.error('User information not available');
    }
  }, [user]);

  return (
    <div>
      <h1>Booked Tours</h1>
      <div className="bookedToursList">
        {bookedTours.map(({ booking_id,user_id,tour_id,people,amount,booking_date }) => {
          return (
            <div key={booking_id} className="singleDestination">

              <div className="cardInfo">
                <div className="continent">
                  <HiOutlineLocationMarker className="icon" />
                </div>
                <div className="desc">
                  <p>booking id: {booking_id}</p>
                  <p>User id: {user_id}</p>
                  <p>tour id: {tour_id}</p>
                  <p>number of people: {people}</p>
                  <p>Amount paid: {amount}</p>
                  <p>Booking Date: {booking_date}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookedTours;
