import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Cursor from "react-animated-cursor";

const GlobalCursor = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if window exists (for SSR safety) and width is desktop
    if (typeof window !== "undefined") {
      setIsDesktop(window.innerWidth >= 1024); // You can adjust the breakpoint
    }
  }, []);

  if (!isDesktop) return null; // Don't render cursor on mobile/tablet

  return createPortal(
    <Cursor
      innerSize={8}
      outerSize={30}
      outerAlpha={0.2}
      innerScale={1.5}
      outerScale={1.5}
      innerColor="#b8860b"
      outerColor="#b8860b"
      outerStyle={{
        border: "2px solid #b8860b",
        boxShadow: "0 0 12px #b8860b88",
      }}
      innerStyle={{ backgroundColor: "#b8860b" }}
      hoverables={["a", "button", ".hoverable"]}
      style={{ pointerEvents: "none" }}
    />,
    document.body
  );
};

export default GlobalCursor;
