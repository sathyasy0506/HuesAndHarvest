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
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../Load";
import Gradient from "../Background/Gradient";
import { ArrowUpRight } from "lucide-react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const bgColors = ["#ffffff"];

function getRandomBg() {
  return bgColors[Math.floor(Math.random() * bgColors.length)];
}

const Snacks = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [priceLimits, setPriceLimits] = useState([0, 0]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [openFilters, setOpenFilters] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedStockStatuses, setSelectedStockStatuses] = useState([]);

  const slugify = (name) =>
    name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  useEffect(() => {
    if (location.state?.category && location.state.category !== "all") {
      setSelectedCategories([location.state.category]);
    }
  }, [location.state]);

  useEffect(() => {
    fetch(ENDPOINTS.LIST_PRODUCTS())
      .then((res) => res.json())
      .then((data) => {
        // ✅ filter out Combo, Combo2p, Combox2 products
        const excluded = ["combo", "combo2p", "combox2"];
        const prods = (data.products || []).filter(
          (p) => !excluded.includes(p.category.toLowerCase())
        );
        setProducts(prods);

        // ✅ remove Combo, Combo2p, Combox2 from categories
        const cats = (data.Categories || []).filter(
          (cat) => !excluded.includes(cat.toLowerCase())
        );
        setCategories(cats);

        if (prods.length > 0) {
          const prices = prods.map((p) => Number(p.price));
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          setPriceLimits([minPrice, maxPrice]);
          setPriceRange([minPrice, maxPrice]);
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

      {/* Category Filter (without Combo) */}
      <div>
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
                    disabled={false}
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
        <Button
          variant="contained"
          onClick={() => {
            setSelectedCategories([]);
            setPriceRange([...priceLimits]);
            setSelectedStockStatuses([]);
          }}
          sx={{ mt: 3 }}
        >
          Reset Filters
        </Button>
      )}
    </div>
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <Gradient>
      <div className="min-h-screen px-4 sm:px-6 py-8 mt-16 bg-transparent">
        {/* Breadcrumb + Sort */}
        <div className="max-w-7xl mx-auto mb-6 flex justify-between items-center">
          <nav className="text-sm text-gray-600 bg-white px-5 py-2 rounded-full shadow-sm">
            Home &gt; Snacks
          </nav>

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
                  padding: "6px 16px",
                  maxWidth: "150px",
                  minWidth: "140px",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                },
                "& .MuiSelect-icon": {
                  right: "8px",
                },
              }}
            >
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                displayEmpty
                renderValue={(selected) => {
                  if (selected === "default") {
                    return <span className="text-gray-500">Sort By</span>;
                  }
                  return selected === "priceLowHigh"
                    ? "Price: Low → High"
                    : selected === "priceHighLow"
                    ? "Price: High → Low"
                    : selected === "nameAZ"
                    ? "Name: A-Z"
                    : "Name: Z-A";
                }}
              >
                <MenuItem value="priceLowHigh">Price: Low → High</MenuItem>
                <MenuItem value="priceHighLow">Price: High → Low</MenuItem>
                <MenuItem value="nameAZ">Name: A-Z</MenuItem>
                <MenuItem value="nameZA">Name: Z-A</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        {/* Main Card */}
        <div className="max-w-7xl mx-auto rounded-2xl shadow-sm p-6 relative bg-white flex h-[80vh]">
          {/* Filters Sidebar */}
          <aside className="hidden lg:block w-1/4 border-r border-dashed border-gray-300">
            <div className="sticky top-0 overflow-y-auto p-4">
              {renderFilters()}
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:w-3/4 w-full pl-6 overflow-y-auto">
            <div className="lg:hidden mb-4">
              <Button
                variant="contained"
                onClick={() => setOpenFilters(true)}
                startIcon={<FilterListIcon />}
              >
                Filters
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pr-2">
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
                      className="w-full aspect-square rounded-2xl flex items-center justify-center overflow-hidden p-4"
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

                    <div className="mt-4 p-2 flex flex-col gap-2">
                      <h3 className="text-lg">{product.name}</h3>

                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-medium">
                            ₹ {Number(product.price).toFixed(2)}
                          </span>
                          <span className="line-through text-gray-400">
                            ₹ {Number(product.oldPrice).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <button
                        className="relative mt-4 w-full bg-[#EFEFEF] rounded-[15px] py-3 px-5 font-medium hover:bg-gray-200 transition"
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
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow">
                            <ArrowUpRight size={16} />
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
        <Dialog
          open={openFilters}
          onClose={() => setOpenFilters(false)}
          fullWidth
          maxWidth="xs"
          PaperProps={{
            style: {
              borderRadius: "20px",
              padding: "16px",
              backgroundColor: "white",
            },
          }}
        >
          <DialogContent>
            {renderFilters()}
            <Button
              fullWidth
              variant="contained"
              onClick={() => setOpenFilters(false)}
              startIcon={<TransitEnterexitIcon />}
              sx={{ mt: 4 }}
            >
              Apply Filters
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </Gradient>
  );
};

export default Snacks;
