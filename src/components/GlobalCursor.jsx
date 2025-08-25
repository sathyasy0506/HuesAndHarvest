import React from "react";
import { createPortal } from "react-dom";
import Cursor from "react-animated-cursor";

const GlobalCursor = () => {
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
    document.body // Append to body
  );
};

export default GlobalCursor;
