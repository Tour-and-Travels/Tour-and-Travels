// import React, { useEffect, useState } from "react";
// import "./main.css";
// import {
//   HiOutlineClipboardCheck,
//   HiOutlineLocationMarker,
// } from "react-icons/hi";
// import { useHistory } from "react-router-dom";

// const Main = () => {
//   const history = useHistory();
//   const [tourData, setTourData] = useState([]);
//   useEffect(() => {
//     fetch("/tour")
//       .then((response) => response.json())
//       .then((data) => {
//         const tours = data.tours;
//         setTourData(tours);
//         console.log(tours);
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);
//   const arrayBufferToBase64 = (buffer) => {
//     const binary = Array.from(new Uint8Array(buffer))
//       .map((byte) => String.fromCharCode(byte))
//       .join("");
//     return btoa(binary);
//   };
//   const [shouldRefresh, setShouldRefresh] = useState(false);
//   useEffect(() => {
//     if (shouldRefresh) {
//       window.location.reload();
//       setShouldRefresh(false);
//     }
//   }, [shouldRefresh]);
//   const handleBookNowClick = (tour_id) => {
//     const user = JSON.parse(localStorage.getItem("userInfo"));
//     if (user) {
//       setTimeout(() => {
//         setShouldRefresh(true);
//         history.push(`/booking-details?tour_id=${tour_id}`);
//       }, 1000);
//     } else {
//       localStorage.setItem(
//         "intendedUrl",
//         `/booking-details?tour_id=${tour_id}`
//       );
//       history.push("/login");
//     }
//   };

//   return (
//     <section className="main section">
//       <div>
//         <h2
//           style={{ fontWeight: "900", fontSize: "1.5em", marginBottom: "5px" }}
//         >
//           Most visited destinations
//         </h2>
//       </div>
//       <div className="secContent">
//         {tourData.map(
//           ({
//             tour_id,
//             image,
//             category,
//             hotel_id,
//             description,
//             Tagline,
//             maximum_occupancy,
//             Price,
//             Duration,
//             Starting_date,
//             Ending_date,
//             hotel_name,
//             location,
//           }) => {
//             const imageUrl = `data:image/jpeg;base64,${arrayBufferToBase64(
//               image.data
//             )}`;
//             // const bookNowLink = `/booking-details?tour_id=${tour_id}`;
//             return (
//               <div key={tour_id} className="singleDestination">
//                 <div className="imageDiv">
//                   <img src={imageUrl} alt={image.data} />
//                 </div>

//                 <div className="cardInfo">
//                   <h4 className="destTitle">{category}</h4>
//                   <div className="continent">
//                     <h2>
//                       <strong>{description.split(".")[0]}</strong>
//                     </h2>
//                     <h4>
//                       <i>
//                         <strong>"{Tagline}"</strong>
//                       </i>
//                     </h4>
//                     <span className="name" style={{ fontWeight: "600" }}>
//                       Hotel id: {hotel_id}
//                       <p style={{ fontWeight: "600" }}>
//                         Hotel name: {hotel_name}
//                       </p>
//                       <p style={{ fontWeight: "600" }}>
//                         Location:{" "}
//                         <HiOutlineLocationMarker
//                           className="icon"
//                           style={{ display: "inline", fontSize: "1.2em" }}
//                         />{" "}
//                         {location}
//                       </p>
//                     </span>
//                   </div>

//                   <div className="desc">
//                     <p>
//                       <i style={{ fontWeight: "600" }}>
//                         {description.split(".").slice(1).join("\n")}
//                       </i>
//                     </p>
//                     <p>Maximum Occupancy: {maximum_occupancy}</p>
//                     <p>
//                       Price per person: {"\u20B9"}
//                       {Price}
//                     </p>
//                     <p>Duration: {Duration}</p>
//                     <p>Available from: {Starting_date.split("T")[0]}</p>
//                     <p>Available Upto: {Ending_date.split("T")[0]}</p>
//                   </div>
//                   <button
//                     className="btn flex"
//                     onClick={() => handleBookNowClick(tour_id)}
//                   >
//                     BOOK NOW
//                     <HiOutlineClipboardCheck className="icon" />
//                   </button>
//                 </div>
//               </div>
//             );
//           }
//         )}
//       </div>
//     </section>
//   );
// };

// export default Main;

import React, { useEffect, useState } from "react";
import "./main.css";
import {
  HiOutlineClipboardCheck,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { useHistory } from "react-router-dom";

const Main = ({ searchQuery }) => {
  const history = useHistory();
  const [tourData, setTourData] = useState([]);
  
  useEffect(() => {
    fetch("/tour")
      .then((response) => response.json())
      .then((data) => {
        const tours = data.tours;
        setTourData(tours);
        console.log(tours);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  
  const arrayBufferToBase64 = (buffer) => {
    const binary = Array.from(new Uint8Array(buffer))
      .map((byte) => String.fromCharCode(byte))
      .join("");
    return btoa(binary);
  };
  
  const [shouldRefresh, setShouldRefresh] = useState(false);
  
  useEffect(() => {
    if (shouldRefresh) {
      window.location.reload();
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);
  
  const handleBookNowClick = (tour_id) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      setTimeout(() => {
        setShouldRefresh(true);
        history.push(`/booking-details?tour_id=${tour_id}`);
      }, 1000);
    } else {
      localStorage.setItem(
        "intendedUrl",
        `/booking-details?tour_id=${tour_id}`
      );
      history.push("/login");
    }
  };

  // Filter the tours based on the search query
  const filteredTours = tourData.filter(({ location }) =>
    location.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        {filteredTours.map(
          ({
            tour_id,
            image,
            category,
            hotel_id,
            description,
            Tagline,
            maximum_occupancy,
            Price,
            Duration,
            Starting_date,
            Ending_date,
            hotel_name,
            location,
          }) => {
            const imageUrl = `data:image/jpeg;base64,${arrayBufferToBase64(
              image.data
            )}`;
            return (
              <div key={tour_id} className="singleDestination">
                <div className="imageDiv">
                  <img src={imageUrl} alt={image.data} />
                </div>

                <div className="cardInfo">
                  <h4 className="destTitle">{category}</h4>
                  <div className="continent">
                    <h2>
                      <strong>{description.split(".")[0]}</strong>
                    </h2>
                    <h4>
                      <i>
                        <strong>"{Tagline}"</strong>
                      </i>
                    </h4>
                    <span className="name" style={{ fontWeight: "600" }}>
                      Hotel id: {hotel_id}
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
                    <p>
                      <i style={{ fontWeight: "600" }}>
                        {description.split(".").slice(1).join("\n")}
                      </i>
                    </p>
                    <p>Maximum Occupancy: {maximum_occupancy}</p>
                    <p>
                      Price per person: {"\u20B9"}
                      {Price}
                    </p>
                    <p>Duration: {Duration}</p>
                    <p>Available from: {Starting_date.split("T")[0]}</p>
                    <p>Available Upto: {Ending_date.split("T")[0]}</p>
                  </div>
                  <button
                    className="btn flex"
                    onClick={() => handleBookNowClick(tour_id)}
                  >
                    BOOK NOW
                    <HiOutlineClipboardCheck className="icon" />
                  </button>
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
};

export default Main;

