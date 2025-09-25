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
import { ENDPOINTS } from "../../api/api";
import NoProductsImg from "../../assets/images/no-product-found.webp";
import { useNavigate } from "react-router-dom";
import Loader from "../Load";
import Gradient from "../Background/Gradient";
import { ArrowUpRight } from "lucide-react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { CheckCircle } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

const bgColors = ["#ffffff"];

function getRandomBg() {
  return bgColors[Math.floor(Math.random() * bgColors.length)];
}

const Snacks = () => {
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [priceLimits, setPriceLimits] = useState([0, 0]);
  const [sortBy, setSortBy] = useState("default");
  const [openFilters, setOpenFilters] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedStockStatuses, setSelectedStockStatuses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const slugify = (name) =>
    name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  useEffect(() => {
    fetch(ENDPOINTS.LIST_PRODUCTS())
      .then((res) => res.json())
      .then((data) => {
        // ✅ Exclude Combo, ComboX2, Combo2p categories
        const excludedCategories = ["combo", "combox2", "combo2p"];
        const prods = (data.products || []).filter(
          (p) => !excludedCategories.includes(p.category.toLowerCase())
        );
        setProducts(prods);

        if (prods.length > 0) {
          const prices = prods.map((p) => Number(p.price));
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          setPriceLimits([minPrice, maxPrice]);
          setPriceRange([minPrice, maxPrice]);

          // Extract unique categories
          const uniqueCategories = [
            ...new Set(prods.map((p) => p.category).filter(Boolean)),
          ].sort();
          setCategories(uniqueCategories);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    if (loading) return [];

    return products
      .filter((p) => {
        const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];

        const stockMatch =
          selectedStockStatuses.length === 0 ||
          selectedStockStatuses.includes(p.stock_status);

        const categoryMatch =
          selectedCategories.length === 0 ||
          selectedCategories.includes(p.category);

        return priceMatch && stockMatch && categoryMatch;
      })
      .sort((a, b) => {
        if (sortBy === "default") {
          const getStockPriority = (p) => {
            if (
              p.stock_status === "instock" &&
              (!p.stock_quantity || p.stock_quantity >= 10)
            )
              return 0;
            if (p.stock_status === "instock" && p.stock_quantity < 10) return 1;
            return 2;
          };

          const stockDiff = getStockPriority(a) - getStockPriority(b);
          if (stockDiff !== 0) return stockDiff;
        }

        if (sortBy === "priceLowHigh") return a.price - b.price;
        if (sortBy === "priceHighLow") return b.price - a.price;
        if (sortBy === "nameAZ") return a.name.localeCompare(b.name);
        if (sortBy === "nameZA") return b.name.localeCompare(a.name);

        return 0;
      });
  }, [
    products,
    priceRange,
    sortBy,
    selectedStockStatuses,
    selectedCategories,
    loading,
  ]);

  const filtersApplied =
    priceRange[0] > priceLimits[0] ||
    priceRange[1] < priceLimits[1] ||
    selectedStockStatuses.length > 0 ||
    selectedCategories.length > 0;

  const renderFilters = () => (
    <div className="p-3">
      <h2 className="font-semibold text-lg mb-6">Filters</h2>

      {/* Price Slider */}
      <div className="mb-6 ">
        <Typography gutterBottom className="font-medium mb-2">
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
            mx: 1,
            color: "#166434",
            "& .MuiSlider-thumb": {
              borderRadius: "50%",
            },
          }}
        />

        <div className="flex justify-between text-sm mt-2">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Category</h3>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategories.includes(cat);
            return (
              <FormControlLabel
                key={cat}
                control={
                  <Checkbox
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
                    sx={{
                      color: "#9ca3af",
                      "&.Mui-checked": {
                        color: "#166434",
                      },
                      "&.Mui-disabled": {
                        color: "#9ca3af",
                      },
                    }}
                  />
                }
                label={cat}
              />
            );
          })}
        </div>
      </div>

      {/* Stock Filter */}
      <div className="mt-6 mb-6">
        <h3 className="font-medium mb-3">Stock Status</h3>
        <div className="flex flex-col gap-2">
          {["instock", "outofstock"].map((status) => {
            const isSelected = selectedStockStatuses.includes(status);
            return (
              <FormControlLabel
                key={status}
                control={
                  <Checkbox
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
                    sx={{
                      color: "#9ca3af",
                      "&.Mui-checked": {
                        color: "#166434",
                      },
                      "&.Mui-disabled": {
                        color: "#9ca3af",
                      },
                    }}
                  />
                }
                label={status === "instock" ? "In Stock" : "Out of Stock"}
              />
            );
          })}
        </div>
      </div>

      {filtersApplied && (
        <button
          onClick={() => {
            setPriceRange([...priceLimits]);
            setSelectedStockStatuses([]);
            setSelectedCategories([]);
          }}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-[#20403D] text-white py-3 px-6 rounded-2xl shadow-md hover:bg-[#1a332f] transition-all duration-300 transform hover:scale-105"
        >
          Reset Filters
          <RestartAltIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <Gradient>
      <div className="min-h-screen px-3 sm:px-6 py-8 mt-16 bg-transparent">
        {/* Breadcrumb + Sort */}
        <div className="max-w-7xl mx-auto mb-6 flex justify-between items-center">
          {/* Breadcrumb (hidden on mobile) */}
          <nav className="hidden sm:block text-sm text-gray-600 bg-white px-5 py-2 rounded-full shadow-sm">
            Home &gt; Snacks
          </nav>

          {/* Filters button (mobile only, matches Sort By style) */}
          <div className="sm:hidden">
            <Button
              variant="outlined"
              onClick={() => setOpenFilters(true)}
              startIcon={<FilterListIcon />}
              sx={{
                fontSize: "0.875rem",
                color: "#4b5563",
                backgroundColor: "#ffffff",
                padding: "6px 12px",
                borderRadius: "9999px",
                textTransform: "none",
                border: "none",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                "&:hover": {
                  backgroundColor: "#f9f9f9",
                  border: "none",
                },
              }}
            >
              Filters
            </Button>
          </div>

          {/* Sort dropdown */}
          <div className="bg-white rounded-full shadow-sm">
            <FormControl
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "9999px",
                  paddingRight: "6px",
                  "& fieldset": { border: "none" },
                  "&:hover fieldset": { border: "none" },
                  "&.Mui-focused fieldset": { border: "none" },
                },
                "& .MuiSelect-select": {
                  padding: "6px 12px",
                  maxWidth: "110px",
                  minWidth: "90px",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "0.875rem",
                },
                "& .MuiSelect-icon": {
                  right: "6px",
                },
              }}
            >
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                displayEmpty
                renderValue={(selected) => {
                  if (selected === "default") {
                    return (
                      <span className="text-gray-500 text-sm">Sort By</span>
                    );
                  }
                  return (
                    <span className="text-sm">
                      {selected === "priceLowHigh"
                        ? "Price: Low → High"
                        : selected === "priceHighLow"
                        ? "Price: High → Low"
                        : selected === "nameAZ"
                        ? "Name: A-Z"
                        : "Name: Z-A"}
                    </span>
                  );
                }}
              >
                <MenuItem value="priceLowHigh" className="text-sm">
                  Price: Low → High
                </MenuItem>
                <MenuItem value="priceHighLow" className="text-sm">
                  Price: High → Low
                </MenuItem>
                <MenuItem value="nameAZ" className="text-sm">
                  Name: A-Z
                </MenuItem>
                <MenuItem value="nameZA" className="text-sm">
                  Name: Z-A
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        {/* Main Card */}
        <div className="max-w-7xl mx-auto rounded-2xl shadow-sm p-4 sm:p-6 relative bg-white flex min-h-[80vh]">
          {/* Filters Sidebar */}
          <aside className="hidden lg:block w-1/4 relative">
            <div className="sticky top-6 p-4 h-[calc(100vh-96px)] overflow-y-auto">
              {renderFilters()}
            </div>
          </aside>

          {/* Vertical Dotted Divider */}
          <div className="hidden lg:block border-l-2 border-dashed border-gray-300 mx-8"></div>

          {/* Product Grid */}
          <main className="lg:w-3/4 w-full lg:pl-6 overflow-y-auto max-h-[calc(100vh-96px)]">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 w-full flex flex-col cursor-pointer"
                    onClick={() =>
                      navigate(`/product/${slugify(product.name)}`, {
                        state: { id: product.id },
                      })
                    }
                    style={{
                      opacity: product.stock_status === "outofstock" ? 0.6 : 1,
                    }}
                  >
                    <div
                      className="w-full aspect-square rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden p-2 sm:p-4"
                      style={{
                        backgroundColor: getRandomBg(),
                        filter:
                          product.stock_status === "outofstock"
                            ? "grayscale(100%)"
                            : "none",
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="mt-3 sm:mt-4 p-1 sm:p-2 flex flex-col gap-1 sm:gap-2 flex-1">
                      {/* Product Name - Full width, no line clamp */}
                      <h3 className="text-sm sm:text-base lg:text-lg font-small min-h-[2.5rem] sm:min-h-[3.5rem] capitalize leading-tight text-center">
                        {product.name}
                      </h3>

                      {/* Prices in column layout */}
                      <div className="flex flex-col sm:flex-row gap-1 mt-1 items-center justify-center">
                        <span className="text-base sm:text-lg font-semibold text-gray-900">
                          ₹ {Number(product.price).toFixed(2)}
                        </span>
                        {product.oldPrice && (
                          <span className="line-through text-gray-400 text-sm sm:text-base sm:ml-2">
                            ₹ {Number(product.oldPrice).toFixed(2)}
                          </span>
                        )}
                      </div>

                      <button
                        className="relative mt-2 sm:mt-auto w-full bg-[#EFEFEF] rounded-[12px] sm:rounded-[15px] py-2 sm:py-3 px-3 sm:px-5 font-medium hover:bg-gray-200 transition text-sm sm:text-base"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${slugify(product.name)}`, {
                            state: { id: product.id },
                          });
                        }}
                        disabled={product.stock_status === "outofstock"}
                      >
                        <span className="block text-center">
                          {product.stock_status === "outofstock"
                            ? "Out of Stock"
                            : "Shop Now"}
                        </span>
                        {product.stock_status !== "outofstock" && (
                          <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white shadow">
                            <ArrowUpRight size={12} className="sm:w-4 sm:h-4" />
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-start h-80">
                  <img
                    src={NoProductsImg}
                    alt="No products found"
                    className="max-h-full object-contain mt-4"
                  />
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Filters Dialog (Mobile) */}
        {openFilters && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
            onClick={() => setOpenFilters(false)}
          >
            <div
              className="bg-white rounded-2xl p-4 w-full max-w-xs relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpenFilters(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <CloseIcon className="w-5 h-5" />
              </button>

              <div>{renderFilters()}</div>

              <button
                onClick={() => setOpenFilters(false)}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-[#20403D] text-white py-3 px-6 rounded-2xl shadow-md hover:bg-[#1a332f] transition-all duration-300 transform hover:scale-105"
              >
                Apply Filters
                <CheckCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </Gradient>
  );
};

export default Snacks;
