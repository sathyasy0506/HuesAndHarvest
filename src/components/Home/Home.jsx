// Home.jsx
import React from "react";
import Silk from "../Home/Silk"; // adjust relative path

const Home = () => {
  return (
    <div className="w-full h-screen -mt-16">
      <Silk
        speed={5}
        scale={1}
        color="#234541" // You can change this or make it dynamic
        noiseIntensity={1.5}
        rotation={0}
      />

    </div>
  );
};

export default Home;
