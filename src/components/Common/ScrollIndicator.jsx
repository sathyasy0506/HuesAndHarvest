import { useEffect, useState } from "react";
import { Mouse } from "lucide-react";

export default function ScrollIndicator({ footerRef }) {
  const [show, setShow] = useState(false);
  const [timerDone, setTimerDone] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  // Timer for initial 20s delay
  useEffect(() => {
    const timer = setTimeout(() => setTimerDone(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Observe footer visibility
  useEffect(() => {
    if (!footerRef?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, [footerRef]);

  if (!timerDone) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-opacity duration-700 ${
        footerVisible ? "opacity-0" : "opacity-100"
      }`}
    >
      <Mouse
        size={28}
        color="#FFD700"
        className={`animate-bounce-smooth transition-opacity duration-700 ${
          footerVisible ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
