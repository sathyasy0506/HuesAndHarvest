import React, { useState, useMemo } from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TransitEnterexitIcon from "@mui/icons-material/TransitEnterexit";
import FilterListIcon from "@mui/icons-material/FilterList";

const Shop = () => {
  const products = [
    { id: 1, name: "Turmeric Powder", price: 126, oldPrice: 599, category: "Spices", image: "https://pngimg.com/uploads/spices/spices_PNG93247.png" },
    { id: 2, name: "Fresh Jack Fruit", price: 130, oldPrice: 599, category: "Fresh Fruits", image: "https://pngimg.com/uploads/pear/pear_PNG3488.png" },
    { id: 3, name: "Fresh Pineapple", price: 490, oldPrice: 599, category: "Fresh Fruits", image: "https://pngimg.com/uploads/pineapple/pineapple_PNG2755.png" },
    { id: 4, name: "Lychee", price: 126, oldPrice: 599, category: "Fresh Fruits", image: "https://pngimg.com/uploads/lychee/lychee_PNG33.png" },
    { id: 5, name: "Veggie Combo", price: 130, oldPrice: 599, category: "Combo", image: "https://pngimg.com/uploads/vegetables/vegetables_PNG10113.png" },
    { id: 6, name: "Fresh Lime", price: 490, oldPrice: 599, category: "Fresh Fruits", image: "https://pngimg.com/uploads/lime/lime_PNG28.png" },
    { id: 7, name: "Mango", price: 250, oldPrice: 499, category: "Fresh Fruits", image: "https://pngimg.com/uploads/mango/mango_PNG91688.png" },
  ];

  const categories = ["Spices", "Fresh Fruits", "Combo"];

  const [priceRange, setPriceRange] = useState([100, 600]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [openFilters, setOpenFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
      return categoryMatch && priceMatch;
    });

    if (sortBy === "priceLowHigh") filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === "priceHighLow") filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === "nameAZ") filtered.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "nameZA") filtered.sort((a, b) => b.name.localeCompare(a.name));

    return filtered;
  }, [selectedCategories, priceRange, sortBy]);

  const filtersApplied = selectedCategories.length > 0 || priceRange[0] > 100 || priceRange[1] < 600;

  const renderFilters = () => (
    <div>
      <h2 className="font-semibold text-lg mb-6" style={{ fontFamily: "var(--font-poppins)" }}>Filters</h2>

      {/* Price Slider */}
      <div className="mb-6">
        <Typography gutterBottom className="font-medium mb-2" style={{ fontFamily: "var(--font-poppins)", color: "var(--text-color)" }}>
          Price Range
        </Typography>
        <Slider
          value={priceRange}
          onChange={(e, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          valueLabelFormat={(val) => `₹${val}`}
          min={100}
          max={600}
          step={1}
          sx={{
            color: "var(--primary-color)",
            "& .MuiSlider-thumb": { borderRadius: "50%", backgroundColor: "var(--primary-color)" },
            "& .MuiSlider-rail": { opacity: 0.3, backgroundColor: "var(--card-color)" },
          }}
        />
        <div className="flex justify-between text-sm mt-2" style={{ color: "var(--text-color)" }}>
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="font-medium mb-3" style={{ fontFamily: "var(--font-poppins)", color: "var(--text-color)" }}>Category</h3>
        {categories.map((cat) => (
          <label key={cat} className="flex items-center gap-2 mb-2 cursor-pointer" style={{ fontFamily: "var(--font-poppins)" }}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => {
                if (selectedCategories.includes(cat)) setSelectedCategories(selectedCategories.filter((c) => c !== cat));
                else setSelectedCategories([...selectedCategories, cat]);
              }}
              className="accent-green-600"
            />
            <span>{cat}</span>
          </label>
        ))}
      </div>

      {/* Reset Filters */}
      {filtersApplied && (
        <Button variant="contained" color="error" className="mt-4" onClick={() => { setSelectedCategories([]); setPriceRange([100, 600]); }}>
          Reset Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8" style={{ backgroundColor: "var(--sho-bg-color)", color: "var(--text-color)", fontFamily: "var(--font-poppins)" }}>
      <div className="max-w-7xl mx-auto rounded-2xl shadow-sm p-6 relative" style={{ backgroundColor: "var(--bg-color)" }}>
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-8 relative">

          {/* Desktop dashed line */}
          <div className="hidden lg:block absolute left-[25%] border-r border-dashed" style={{ borderColor: "grey", height: "100%", top: 0 }}></div>

          {/* Filters Sidebar for Desktop */}
          <aside className="hidden lg:block pr-6 sticky top-6 h-fit z-10 bg-[var(--bg-color)]">
            {renderFilters()}
          </aside>

          {/* Products Section */}
          <main className="lg:col-span-3 w-full">

            {/* Sort By + Filters Button Row */}
            <div className="flex justify-between mb-4 lg:justify-end items-center gap-4">
              {/* Sort By */}
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  displayEmpty
                  sx={{
                    borderRadius: "9999px",
                    backgroundColor: "var(--card-color)",
                    color: "var(--text-color)",
                    fontWeight: 500,
                    px: 3,
                    py: 1,
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

              {/* Filters Button for Mobile/Tablet */}
              <div className="lg:hidden">
                <Button
                  variant="contained"
                  onClick={() => setOpenFilters(true)}
                  startIcon={<FilterListIcon />}
                  sx={{
                    backgroundColor: "var(--primary-color)",
                    color: "var(--bg-color)",
                    borderRadius: "9999px",
                    textTransform: "none",
                    px: 4,
                    py: 1,
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

            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div key={p.id} className="rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col">
                  <div className="aspect-square flex items-center justify-center mb-4 bg-blue-50 rounded-lg">
                    <img src={p.image} alt={p.name} className="max-h-32 object-contain" />
                  </div>

                  <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--text-color)", fontFamily: "var(--font-poppins)", lineHeight: 1.2 }}>
                    {p.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-base font-semibold" style={{ color: "var(--primary-color)" }}>₹ {p.price.toFixed(2)}</span>
                    <span className="text-xs line-through" style={{ color: "var(--text-color)" }}>₹ {p.oldPrice.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-center items-center h-full">
                    <button className="relative w-full px-4 py-2 flex items-center justify-center transition" style={{
                      backgroundColor: "var(--primary-color)",
                      color: "var(--bg-color)",
                      fontFamily: "var(--font-poppins)",
                      fontWeight: 500,
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "6px",
                      borderBottomRightRadius: "16px",
                      borderBottomLeftRadius: "6px",
                    }}>
                      <span>Shop Now</span>
                      <span style={{
                        backgroundColor: "var(--bg-color)",
                        color: "var(--primary-color)",
                        borderRadius: "9999px",
                        padding: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transform: "rotate(-180deg)",
                        position: "absolute",
                        right: "10px",
                      }}>
                        <TransitEnterexitIcon fontSize="small" />
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile/Tablet Filters Modal */}
      <Dialog open={openFilters} onClose={() => setOpenFilters(false)} fullWidth>
        <DialogContent>{renderFilters()}</DialogContent>
      </Dialog>
    </div>
  );
};

export default Shop;
