import React, { useEffect, useState } from "react";

const Gradient = ({ children }) => {
  const [blobs, setBlobs] = useState([]);
  const [contentHeight, setContentHeight] = useState(0);

  const generateBlobs = (height) => {
    const blobCount = Math.max(Math.floor(height / 600), 3); // fewer blobs
    return Array.from({ length: blobCount }, (_, i) => ({
      id: i,
      // Only place on sides (0-20% or 80-100%)
      x: Math.random() < 0.5 ? Math.random() * 20 : 80 + Math.random() * 20,
      y: Math.random() * 100,
      size: Math.random() * 300 + 250, // bigger size (250px - 550px)
    }));
  };

  useEffect(() => {
    const contentElement = document.querySelector("[data-gradient-content]");

    const updateHeight = () => {
      if (contentElement) setContentHeight(contentElement.scrollHeight);
    };

    if (contentElement) {
      setContentHeight(contentElement.scrollHeight);
      setBlobs(generateBlobs(contentElement.scrollHeight));
    }

    window.addEventListener("resize", updateHeight);

    let timeoutId;
    const observer = new MutationObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateHeight, 100);
    });
    if (contentElement) {
      observer.observe(contentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });
    }

    return () => {
      window.removeEventListener("resize", updateHeight);
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div
        className="absolute inset-0 w-full"
        style={{
          minHeight: "100vh",
          height: contentHeight > 0 ? `${contentHeight}px` : "auto",
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
              background: `radial-gradient(circle, var(--dark-gold-color) 0%, rgba(184, 134, 11, 0.15) 40%, transparent 100%)`,
              filter: "blur(40px)",
              transform: "translate(-50%, -50%)",
              opacity: 0.25, // reduced intensity
            }}
          />
        ))}

        {/* Static side blobs for depth */}
        <div
          className="absolute top-1/4 left-1/12 rounded-full"
          style={{
            width: "500px", // bigger
            height: "500px", // bigger
            background: `radial-gradient(circle, var(--dark-gold-color) 0%, rgba(184, 134, 11, 0.15) 40%, transparent 100%)`,
            filter: "blur(50px)",
            transform: "translate(-50%, -50%)",
            opacity: 0.2,
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/12 rounded-full"
          style={{
            width: "600px", // bigger
            height: "600px", // bigger
            background: `radial-gradient(circle, var(--dark-gold-color) 0%, rgba(184, 134, 11, 0.15) 40%, transparent 100%)`,
            filter: "blur(60px)",
            transform: "translate(-50%, -50%)",
            opacity: 0.2,
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
