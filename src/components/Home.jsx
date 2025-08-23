import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [activePhilosophy, setActivePhilosophy] = useState("vision");
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--bg-color)] transition-colors">
      <h1 className="text-6xl font-extrabold tracking-widest uppercase drop-shadow-lg text-[var(--text-color)] font-heading">
        Hues & Harvest
      </h1>
    </div>
  );
};

export default Home;
