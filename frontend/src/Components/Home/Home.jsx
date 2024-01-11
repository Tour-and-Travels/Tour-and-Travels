import React from "react";
import "./home.css";
import video from "../../Assets/video.mp4";

const Home = () => {
  return (
    <section className="home">
      <div className="video-container">
        <video src={video} muted autoPlay loop type="video/mp4"></video>
      </div>
    </section>
  );
};

export default Home;
