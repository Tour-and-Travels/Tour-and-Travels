
import React, { useEffect, useState } from "react";
import "./BookedTours.css"; // Import your CSS file for styling
import { Button, useMediaQuery } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

const BookedTours = () => {
  const [bookedTours, setBookedTours] = useState([]);
  const user = JSON.parse(localStorage.getItem("userInfo")).user;
  const [isSmallScreen] = useMediaQuery("(max-width: 400px)");
  const [cancelBookingId, setCancelBookingId] = useState(null);
  const [isCancelConfirmationOpen, setCancelConfirmationOpen] = useState(false);
  const [isRefundModalOpen, setRefundModalOpen] = useState(false);
  const [tourDetails, setTourDetails] = useState(null);
  const [refundMessage, setRefundMessage] = useState(""); // New state for refund message
  const refundPercentage = 4;
  const [tourId, setTourId] = useState();
  const [price, setPrice] = useState();
  const history = useHistory();
  const fetchBooking = (userId) => {
    fetch(`/booking/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const booking = data.booking;
        console.log(booking);
        setBookedTours(booking);
        if (booking.length > 0) {
          const firstBooking = booking[0];
          setTourId(firstBooking.tour_id);
        }
      })
      .catch((error) => console.error("Error fetching booked tours:", error));
  };

  // const fetchTourDetails = async () => {
  //   try {
  //     const response = await fetch(`/tour/specificread/${tourId}`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data);
  //       setTourDetails(data.tour);
  //       setPrice(data.tour.Price);
  //       console.log(data.tour);
  //       console.log(data.tour.Price);
  //     } else {
  //       throw new Error("Failed to fetch tour details");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching tour details:", error);
  //     // Handle error
  //   }
  // };
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

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await fetchBooking(user.user_id);
      } else {
        console.error("User information not available");
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchTourData = async () => {
  //     if (tourId) {
  //       await fetchTourDetails(tourId);
  //     } else {
  //       console.error("Tour information not available");
  //     }
  //   };
  //   fetchTourData();
  // }, [tourId]);

  const handleCancelBooking = (bookingId, tourId) => {
    setTourId(tourId);
    setCancelBookingId(bookingId);
    setCancelConfirmationOpen(true);
  };

  const handleCancelConfirmation = async () => {
    try {
      const response = await fetch(`/booking/cancel/${cancelBookingId}`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("Error cancelling booking");
      }

      const data = await response.json();
      console.log(data);

      setBookedTours((prevBookedTours) =>
        prevBookedTours.map((booking) =>
          booking.booking_id === cancelBookingId
            ? { ...booking, booking_status: 0 }
            : booking
        )
      );
      // Calculate refund amount
      const refundedAmount = (price * refundPercentage) / 100;

      // Set the refund message
      setRefundMessage(
        `We have successfully processed your refund for the cancelled booking. As per our policy, ${refundPercentage}% of the tour amount has been deducted, and the remaining ₹${
          price - refundedAmount
        } has been refunded to your account. You will receive the refund within the next 5-7 business days. Thank you for choosing Trip-Trekker, and we hope to serve you better in the future.`
      );

      // Show refund modal
      setRefundModalOpen(true);
    } catch (error) {
      console.error("Error handling cancel confirmation:", error);
    }
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
          }) => (
            <div key={booking_id} className="booking-card">
              <div className="booking-details">
                <p>Booking ID: {booking_id}</p>
                <p>User ID: {user_id}</p>
                <p>Tour ID: {tour_id}</p>
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
                {booking_status === 1 && (
                  <Button
                    mb="1"
                    bg="#ff0000"
                    color="white"
                    _hover={{
                      boxShadow: "none",
                      transition: "none",
                    }}
                    onClick={() => handleCancelBooking(booking_id, tour_id)}
                  >
                    Cancel Booking
                  </Button>
                )}
              </div>
            </div>
          )
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      <Modal
        isOpen={isCancelConfirmationOpen}
        onClose={() => setCancelConfirmationOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to cancel the booking?</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => setCancelConfirmationOpen(false)}
            >
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleCancelConfirmation}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Refund Modal */}

      {tourDetails && (
        <Modal
          isOpen={isRefundModalOpen}
          onClose={() => setRefundModalOpen(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Refund Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>{refundMessage}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                onClick={() => setRefundModalOpen(false)}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default BookedTours;
