import React, { useState, useEffect } from "react";

const Gradient = ({ children }) => {
  const [blobs, setBlobs] = useState([]);

  const generateBlobs = () => {
    const blobCount = 5;
    return Array.from({ length: blobCount }, (_, i) => ({
      id: i,
      x: Math.random() < 0.5 ? Math.random() * 20 : 80 + Math.random() * 20,
      y: Math.random() * 100,
      size: Math.random() * 400 + 400, // bigger: 400px – 800px
    }));
  };

  useEffect(() => {
    setBlobs(generateBlobs());
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden -mt-16">
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundColor: "var(--secondary-bg)",
        }}
      >
        {/* Dynamic side blobs */}
        {blobs.map((blob) => (
          <div
            key={blob.id}
            className="absolute rounded-full"
            style={{
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              width: `${blob.size}px`,
              height: `${blob.size}px`,
              background: `radial-gradient(circle,
                var(--dark-gold-color) 0%,
                rgba(184, 134, 11, 0.12) 25%,   /* reduced gradient spread */
                transparent 60%)`,
              filter: "blur(50px)", // slightly stronger blur
              transform: "translate(-50%, -50%)",
              opacity: 0.2, // softer opacity
            }}
          />
        ))}

        {/* Static side blobs for depth */}
        <div
          className="absolute top-1/4 left-1/12 rounded-full"
          style={{
            width: "650px", // bigger
            height: "650px",
            background: `radial-gradient(circle,
              var(--dark-gold-color) 0%,
              rgba(184, 134, 11, 0.12) 25%,
              transparent 60%)`,
            filter: "blur(60px)",
            transform: "translate(-50%, -50%)",
            opacity: 0.18,
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/12 rounded-full"
          style={{
            width: "750px", // bigger
            height: "750px",
            background: `radial-gradient(circle,
              var(--dark-gold-color) 0%,
              rgba(184, 134, 11, 0.12) 25%,
              transparent 60%)`,
            filter: "blur(70px)",
            transform: "translate(-50%, -50%)",
            opacity: 0.18,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10" data-gradient-content>
        {children}
      </div>
    </div>
  );
};

export default Gradient;
