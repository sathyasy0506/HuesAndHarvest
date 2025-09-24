import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../api/api";

// --- helpers -------------------------------------------------
const bgColors = ["#ffffff"];
const getRandomBg = () => bgColors[Math.floor(Math.random() * bgColors.length)];

const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

function ProductCard({ product, onClick, emphasized }) {
  if (!product) return null;

  return (
    <div
      className={[
        "relative flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer",
        "transition-all duration-700 ease-out",
        emphasized
          ? "scale-105 opacity-100 blur-0 brightness-100"
          : "scale-90 opacity-70 blur-sm brightness-110 pointer-events-none",
      ].join(" ")}
      style={{ width: 250, height: 380 }}
      onClick={onClick}
    >
      {/* Combo Badge */}
      <div className="absolute top-3 left-3 z-20">
        <span className="bg-[#C6B560] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          Combo
        </span>
      </div>

      {/* White blurry overlay for side cards */}
      {/* Green blurry overlay for side cards */}
      {!emphasized && (
        <div
          className="absolute inset-0 rounded-2xl z-20"
          style={{
            backgroundColor: "rgba(84, 136, 109, 0.6)",
            backdropFilter: "blur(1000px)", // heavy blur
          }}
        ></div>
      )}

      {/* image */}
      <div
        className="w-full flex items-center justify-center p-4"
        style={{ height: "65%", backgroundColor: product.bgColor }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* details */}
      <div className="flex flex-col flex-1 p-3 gap-2 relative z-20 items-center">
        <h3 className="text-lg text-red-800 capitalize">{product.name}</h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">₹ {product.price}.00</span>
            <span className="line-through text-red-400 text-xs">
              ₹ {product.oldPrice}.00
            </span>
          </div>
        </div>

        <button className="relative mt-auto w-full bg-[#EFEFEF] rounded-[15px] py-2 px-4 font-medium hover:bg-gray-200 transition">
          <span className="block text-center">Shop Now</span>
        </button>
      </div>
    </div>
  );
}

// --- main carousel -------------------------------------------
export default function ProductCylinderCarousel() {
  const [products, setProducts] = useState([]);
  const [display, setDisplay] = useState({ left: 0, center: 0, right: 0 });
  const [roles, setRoles] = useState(["left", "center", "right"]);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const DURATION = 700;

  // fetch products
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(ENDPOINTS.LIST_COMBO());
        const data = await res.json();
        if (data?.success) {
          const withColor = data.products.map((p) => ({
            ...p,
            bgColor: getRandomBg(),
          }));
          setProducts(withColor);
          if (withColor.length) {
            setDisplay({
              center: 0,
              left: (withColor.length - 1) % withColor.length,
              right: (0 + 1) % withColor.length,
            });
          }
        }
      } catch (e) {
        console.error("Error fetching products:", e);
      }
    })();
  }, []);

  // go next
  const goNext = () => {
    if (isAnimating || products.length < 2) return;
    setIsAnimating(true);

    const n = products.length;
    const newCenter = display.right;
    const newLeft = display.center;
    const newRight = (display.right + 1) % n;

    setRoles(["right", "left", "center"]);

    setTimeout(() => {
      setDisplay({ left: newLeft, center: newCenter, right: newRight });
      setRoles(["left", "center", "right"]);
      setIsAnimating(false);
    }, DURATION);
  };

  // go prev
  const goPrev = () => {
    if (isAnimating || products.length < 2) return;
    setIsAnimating(true);

    const n = products.length;
    const newCenter = display.left;
    const newRight = display.center;
    const newLeft = (display.left - 1 + n) % n;

    setRoles(["center", "right", "left"]);

    setTimeout(() => {
      setDisplay({ left: newLeft, center: newCenter, right: newRight });
      setRoles(["left", "center", "right"]);
      setIsAnimating(false);
    }, DURATION);
  };

  if (!products.length) return null;

  // transforms
  const pos = {
    left: {
      transform: "translateX(-50px) rotateY(22deg) translateZ(-90px)",
      zIndex: 2,
    },
    center: {
      transform: "translateX(0px) rotateY(0deg) translateZ(0px)",
      zIndex: 5,
    },
    right: {
      transform: "translateX(50px) rotateY(-22deg) translateZ(-90px)",
      zIndex: 2,
    },
  };

  const slots = [
    {
      key: "slot-left",
      role: roles[0],
      product: products[display.left],
      emphasized: false,
    },
    {
      key: "slot-center",
      role: roles[1],
      product: products[display.center],
      emphasized: true,
    },
    {
      key: "slot-right",
      role: roles[2],
      product: products[display.right],
      emphasized: false,
    },
  ];

  return (
    <section className="max-w-xl mx-auto text-gray-800 p-3 rounded-2xl flex flex-col items-center bg-transparent">
      <div
        className="relative"
        style={{ width: 520, height: 420, perspective: "1300px" }}
      >
        {/* Cards */}
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {slots.map(({ key, role, product, emphasized }) => (
            <div
              key={key}
              className="absolute top-1/2 left-1/2 will-change-transform transition-transform duration-700 ease-out"
              style={{
                ...pos[role],
                transformStyle: "preserve-3d",
                translate: "-50% -50%",
              }}
            >
              <ProductCard
                product={product}
                emphasized={role === "center"}
                onClick={() =>
                  role === "center" &&
                  navigate(`/product/${slugify(product.name)}`, {
                    state: { id: product.id },
                  })
                }
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons (very close to center card) */}

        <button
          onClick={goPrev}
          disabled={isAnimating}
          className="absolute top-1/2 left-1/2 -translate-x-[186px] -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={goNext}
          disabled={isAnimating}
          className="absolute top-1/2 left-1/2 translate-x-[140px] -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronRight />
        </button>
      </div>
      <div className="text-center mt-6">
        <h2 className="text-xl tracking-wide text-white ">Combo Products</h2>
      </div>
    </section>
  );
}
