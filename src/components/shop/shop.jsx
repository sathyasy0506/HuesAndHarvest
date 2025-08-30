import React, { useState, useEffect, useMemo } from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TransitEnterexitIcon from "@mui/icons-material/TransitEnterexit";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { ENDPOINTS } from "../../api/config";
import NoProductsImg from "../../assets/images/no-product-found.webp";
import { useNavigate } from "react-router-dom";
import Loader from "../Load";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [priceLimits, setPriceLimits] = useState([0, 0]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [openFilters, setOpenFilters] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Added loading state
  const [selectedStockStatuses, setSelectedStockStatuses] = useState([]); // [] = all

  const slugify = (name) =>
    name
      .toLowerCase()
      .replace(/\s+/g, "-") // spaces → hyphens
      .replace(/[^\w-]+/g, ""); // remove special characters

  useEffect(() => {
    fetch(ENDPOINTS.LIST_PRODUCTS)
      .then((res) => res.json())
      .then((data) => {
        const prods = data.products || [];
        setProducts(prods);
        setCategories(data.Categories || []);

        if (prods.length > 0) {
          const prices = prods.map((p) => Number(p.price));
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          setPriceLimits([minPrice, maxPrice]);
          setPriceRange([minPrice, maxPrice]);
        }
        setLoading(false); // Stop loading after fetch
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    if (loading) return []; // Return empty array while loading

    return products
      .filter((p) => {
        const categoryMatch =
          selectedCategories.length === 0 ||
          selectedCategories.includes(p.category);

        const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];

        const stockMatch =
          selectedStockStatuses.length === 0 ||
          selectedStockStatuses.includes(p.stock_status);

        return categoryMatch && priceMatch && stockMatch;
      })
      .sort((a, b) => {
        // Apply stock-priority only for default sort
        if (sortBy === "default") {
          const getStockPriority = (p) => {
            if (
              p.stock_status === "instock" &&
              (!p.stock_quantity || p.stock_quantity >= 10)
            )
              return 0;
            if (p.stock_status === "instock" && p.stock_quantity < 10) return 1; // low stock
            return 2; // out of stock
          };

          const stockDiff = getStockPriority(a) - getStockPriority(b);
          if (stockDiff !== 0) return stockDiff;
        }

        // Apply user-selected sort
        if (sortBy === "priceLowHigh") return a.price - b.price;
        if (sortBy === "priceHighLow") return b.price - a.price;
        if (sortBy === "nameAZ") return a.name.localeCompare(b.name);
        if (sortBy === "nameZA") return b.name.localeCompare(a.name);

        return 0;
      });
  }, [
    products,
    selectedCategories,
    priceRange,
    sortBy,
    selectedStockStatuses,
    loading,
  ]);

  const filtersApplied =
    selectedCategories.length > 0 ||
    priceRange[0] > priceLimits[0] ||
    priceRange[1] < priceLimits[1] ||
    selectedStockStatuses.length > 0;

  const renderFilters = () => (
    <div>
      <h2
        className="font-semibold text-lg mb-6"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        Filters
      </h2>

      {/* Price Slider */}
      <div className="mb-6">
        <Typography
          gutterBottom
          className="font-medium mb-2"
          style={{
            fontFamily: "var(--font-poppins)",
            color: "var(--text-color)",
          }}
        >
          Price Range
        </Typography>
        <Slider
          value={priceRange}
          onChange={(e, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          valueLabelFormat={(val) => `₹${val}`}
          min={priceLimits[0]}
          max={priceLimits[1]}
          step={1}
          sx={{
            color: "var(--primary-color)",
            "& .MuiSlider-thumb": {
              borderRadius: "50%",
              backgroundColor: "var(--primary-color)",
            },
            "& .MuiSlider-rail": {
              opacity: 0.3,
              backgroundColor: "var(--card-color)",
            },
          }}
        />
        <div
          className="flex justify-between text-sm mt-2"
          style={{ color: "var(--text-color)" }}
        >
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h3
          className="font-medium mb-3"
          style={{
            fontFamily: "var(--font-poppins)",
            color: "var(--text-color)",
          }}
        >
          Category
        </h3>

        <div className="flex flex-col gap-2 w-max">
          {categories.map((cat) => {
            const isSelected = selectedCategories.includes(cat);
            return (
              <label
                key={cat}
                className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-xl hover:shadow-md transition-shadow duration-200"
                style={{
                  fontFamily: "var(--font-poppins)",
                  backgroundColor: "var(--card-color)",
                  width: "fit-content",
                }}
              >
                {/* Hidden Checkbox */}
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {
                    if (isSelected) {
                      setSelectedCategories(
                        selectedCategories.filter((c) => c !== cat)
                      );
                    } else {
                      setSelectedCategories([...selectedCategories, cat]);
                    }
                  }}
                  className="hidden"
                />

                {/* Custom Checkbox */}
                <span
                  className={`w-5 h-5 flex items-center justify-center rounded-md border-2 transition-all duration-300
              ${
                isSelected
                  ? "bg-[var(--primary-color)] border-[var(--primary-color)]"
                  : "border-gray-400"
              }`}
                >
                  <svg
                    className={`w-3 h-3 text-[var(--bg-color)] transition-transform duration-300 ease-out
                ${isSelected ? "animate-bounce-tick scale-100" : "scale-0"}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>

                {/* Category Label */}
                <span className="font-medium text-[var(--text-color)] whitespace-nowrap">
                  {cat}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="mt-6 mb-6">
        <h3
          className="font-medium mb-3"
          style={{
            fontFamily: "var(--font-poppins)",
            color: "var(--text-color)",
          }}
        >
          Stock Status
        </h3>
        <div className="flex flex-col gap-2 w-max">
          {["instock", "outofstock"].map((status) => {
            const isSelected = selectedStockStatuses.includes(status);
            return (
              <label
                key={status}
                className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-xl hover:shadow-md transition-shadow duration-200"
                style={{
                  fontFamily: "var(--font-poppins)",
                  backgroundColor: "var(--card-color)",
                  width: "fit-content",
                }}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {
                    if (isSelected) {
                      setSelectedStockStatuses(
                        selectedStockStatuses.filter((s) => s !== status)
                      );
                    } else {
                      setSelectedStockStatuses([
                        ...selectedStockStatuses,
                        status,
                      ]);
                    }
                  }}
                  className="hidden"
                />

                <span
                  className={`w-5 h-5 flex items-center justify-center rounded-md border-2 transition-all duration-300
              ${
                isSelected
                  ? "bg-[var(--primary-color)] border-[var(--primary-color)]"
                  : "border-gray-400"
              }`}
                >
                  <svg
                    className={`w-3 h-3 text-[var(--bg-color)] transition-transform duration-300 ease-out
                ${isSelected ? "animate-bounce-tick scale-100" : "scale-0"}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>

                <span className="font-medium text-[var(--text-color)] whitespace-nowrap">
                  {status === "instock" ? "In Stock" : "Out of Stock"}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Reset Filters */}
      {filtersApplied && (
        <Button
          variant="contained"
          onClick={() => {
            setSelectedCategories([]);
            setPriceRange([...priceLimits]);
            setSelectedStockStatuses([]); // reset stock filter
          }}
          sx={{
            mt: 3,
            px: 3,
            py: 1.5,
            borderRadius: "14px",
            textTransform: "none",
            fontWeight: 500,
            background: "rgba(255, 99, 99, 0.85)",
            color: "var(--text-color)",
            display: "flex",
            alignItems: "center",
            gap: 0.3,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            "&:hover": {
              background: "rgba(255, 99, 99, 0.95)",
              boxShadow: "0 6px 25px rgba(0, 0, 0, 0.25)",
            },
          }}
        >
          <span>Reset Filters</span>
          <CloseIcon fontSize="small" />
        </Button>
      )}
    </div>
  );

  // Show loader while data is being fetched
  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className="min-h-screen px-4 sm:px-6 py-8 mt-0"
      style={{
        backgroundColor: "var(--secondary-bg)",
        color: "var(--text-color)",
        fontFamily: "var(--font-poppins)",
      }}
    >
      <div
        className="max-w-7xl mx-auto rounded-2xl shadow-sm p-6 relative"
        style={{ backgroundColor: "var(--bg-color)" }}
      >
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-8 relative">
          <div
            className="hidden lg:block absolute left-[25%] border-r border-dashed"
            style={{ borderColor: "grey", height: "100%", top: 0 }}
          ></div>

          {/* Sticky Filters */}
          <aside className="hidden lg:block pr-6 sticky top-28 h-fit z-10 bg-[var(--bg-color)]">
            {renderFilters()}
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-3 w-full">
            <div className="flex justify-between mb-4 lg:justify-end items-center gap-4">
              <FormControl size="small" sx={{ minWidth: 90 }}>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  displayEmpty
                  sx={{
                    borderRadius: "17px",
                    backgroundColor: "var(--card-color)",
                    color: "var(--text-color)",
                    fontWeight: 500,
                    px: 2,
                    py: 0.5,
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                    "& .MuiSelect-icon": { color: "var(--primary-color)" },
                  }}
                >
                  <MenuItem value="default">Sort By</MenuItem>
                  <MenuItem value="priceLowHigh">Price: Low to High</MenuItem>
                  <MenuItem value="priceHighLow">Price: High to Low</MenuItem>
                  <MenuItem value="nameAZ">Name: A-Z</MenuItem>
                  <MenuItem value="nameZA">Name: Z-A</MenuItem>
                </Select>
              </FormControl>

              <div className="lg:hidden">
                <Button
                  variant="contained"
                  onClick={() => setOpenFilters(true)}
                  startIcon={<FilterListIcon />}
                  sx={{
                    backgroundColor: "var(--primary-color)",
                    color: "var(--bg-color)",
                    borderRadius: "17px",
                    textTransform: "none",
                    px: 4,
                    py: 1.4,
                    fontWeight: 500,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    "&:hover": {
                      backgroundColor: "darkgreen",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                    },
                  }}
                >
                  Filters
                </Button>
              </div>
            </div>

            {/* Scrollable Product Cards */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pr-2"
              style={{
                minHeight: "70vh", // adjust height as needed
                maxHeight: "85vh", // adjust height as needed
                overflowY: "auto",
              }}
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col cursor-pointer"
                    style={{
                      opacity: p.stock_status === "outofstock" ? 0.6 : 1,
                    }}
                    // In your Shop component
                    onClick={() =>
                      navigate(`/product/${slugify(p.name)}`, {
                        state: { id: p.id },
                      })
                    }
                  >
                    {/* Image */}
                    <div
                      className="aspect-square flex items-center justify-center mb-4 bg-gray-50 dark:bg-gray-200 rounded-lg"
                      style={{
                        filter:
                          p.stock_status === "outofstock"
                            ? "grayscale(100%)"
                            : "none",
                      }}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="max-h-72 object-contain"
                        style={{
                          filter:
                            p.stock_status === "outofstock"
                              ? "grayscale(100%)"
                              : "none",
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <h3
                      className="font-semibold text-sm mb-2"
                      style={{
                        color: "var(--text-color)",
                        fontFamily: "var(--font-poppins)",
                        lineHeight: 1.2,
                      }}
                    >
                      {p.name}
                    </h3>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-base font-semibold"
                          style={{ color: "var(--primary-color)" }}
                        >
                          ₹ {Number(p.price).toFixed(2)}
                        </span>
                        <span
                          className="text-xs line-through"
                          style={{ color: "var(--text-color)" }}
                        >
                          ₹ {Number(p.oldPrice).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Shop Now Button */}
                    <div className="flex justify-center items-center h-full">
                      <button
                        className="relative w-full px-4 py-2 flex items-center justify-center transition"
                        style={{
                          backgroundColor: "var(--primary-color)",
                          color: "var(--bg-color)",
                          fontFamily: "var(--font-poppins)",
                          fontWeight: 500,
                          borderTopLeftRadius: "16px",
                          borderTopRightRadius: "6px",
                          borderBottomRightRadius: "16px",
                          borderBottomLeftRadius: "6px",
                          pointerEvents:
                            p.stock_status === "outofstock" ? "none" : "auto",
                        }}
                        onClick={(e) => {
                          e.stopPropagation(); // prevent card click
                          navigate(`/product/${slugify(p.name)}`, {
                            state: { id: p.id },
                          });
                        }}
                      >
                        <span>Shop Now</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-start h-80">
                  <img
                    src={NoProductsImg} // imported image
                    alt="No products found"
                    className="max-h-full object-contain mt-4"
                  />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <Dialog
        open={openFilters}
        onClose={() => setOpenFilters(false)}
        fullWidth
      >
        <DialogContent>{renderFilters()}</DialogContent>
      </Dialog>
    </div>
  );
};

export default Shop;
