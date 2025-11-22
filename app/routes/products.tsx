// app/routes/products.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ProductCard, { defaultProducts } from "../Components/ProductCard";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "All Products - Vegist" },
    { name: "description", content: "Browse all our premium quality products at Vegist" },
  ];
}

// Store/Outlet location interface
interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  isActive: boolean;
}

// Price range interface
interface PriceRange {
  min: number;
  max: number;
  label: string;
}

export default function Products() {
  const [filteredProducts, setFilteredProducts] = useState(defaultProducts);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  
  // New state for additional filters
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 5000, label: "All" });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string>("all");
  const [userCountry, setUserCountry] = useState<string>("IN"); // Default to India

  // Store locations data
  const storeLocations: StoreLocation[] = [
    { id: "store-1", name: "Vegist Main Store", address: "123 Main Street", city: "Mumbai", country: "IN", isActive: true },
    { id: "store-2", name: "Vegist Downtown", address: "456 Downtown Ave", city: "Delhi", country: "IN", isActive: true },
    { id: "store-3", name: "Vegist Premium", address: "789 Luxury Road", city: "Bangalore", country: "IN", isActive: true },
    { id: "store-4", name: "Vegist Express", address: "321 Quick Lane", city: "Chennai", country: "IN", isActive: false },
    { id: "store-5", name: "Vegist International", address: "654 Global Street", city: "Dubai", country: "AE", isActive: true },
  ];

  // Country-specific price ranges
  const countryPriceRanges: Record<string, PriceRange[]> = {
    "IN": [ // India - INR
      { min: 100, max: 500, label: "₹100 - ₹500" },
      { min: 500, max: 1000, label: "₹500 - ₹1,000" },
      { min: 1000, max: 2000, label: "₹1,000 - ₹2,000" },
      { min: 2000, max: 5000, label: "₹2,000 - ₹5,000" },
      { min: 5000, max: 10000, label: "₹5,000 - ₹10,000" }
    ],
    "US": [ // USA - USD
      { min: 1, max: 10, label: "$1 - $10" },
      { min: 10, max: 25, label: "$10 - $25" },
      { min: 25, max: 50, label: "$25 - $50" },
      { min: 50, max: 100, label: "$50 - $100" },
      { min: 100, max: 200, label: "$100 - $200" }
    ],
    "AE": [ // UAE - AED
      { min: 5, max: 25, label: "5 AED - 25 AED" },
      { min: 25, max: 50, label: "25 AED - 50 AED" },
      { min: 50, max: 100, label: "50 AED - 100 AED" },
      { min: 100, max: 200, label: "100 AED - 200 AED" },
      { min: 200, max: 500, label: "200 AED - 500 AED" }
    ],
    "EU": [ // Europe - EUR
      { min: 1, max: 10, label: "€1 - €10" },
      { min: 10, max: 25, label: "€10 - €25" },
      { min: 25, max: 50, label: "€25 - €50" },
      { min: 50, max: 100, label: "€50 - €100" },
      { min: 100, max: 200, label: "€100 - €200" }
    ]
  };

  const categories = [
    "Boter's rock",
    "Bestseller", 
    "Breakfast",
    "Dairy & cheese",
    "Deal collection",
    "Dinner",
    "Featured product"
  ];

  const brands = [
    "Premium Basmati",
    "Classic Basmati", 
    "Royal Basmati",
    "Everyday Basmati",
    "Organic Valley",
    "Farm Fresh",
    "Nature's Best"
  ];

  const sizes = ["1kg", "2kg", "3kg", "4kg", "5kg"];
  const ratings = [5, 4, 3, 2, 1];
  const availabilityOptions = [
    { value: "all", label: "All" },
    { value: "in-stock", label: "In Stock" },
    { value: "out-of-stock", label: "Out of Stock" }
  ];

  // Get current price ranges based on user country
  const currentPriceRanges = countryPriceRanges[userCountry] || countryPriceRanges["IN"];

  // Enhanced product data with additional properties for filtering
  const enhancedProducts = defaultProducts.map(product => ({
    ...product,
    discount: Math.floor(Math.random() * 30) + 5, // Random discount between 5-35%
    popularity: Math.floor(Math.random() * 100) + 1, // Random popularity score
    brand: brands[Math.floor(Math.random() * brands.length)],
    storeAvailability: storeLocations.filter(store => Math.random() > 0.3).map(store => store.id) // Random store availability
  }));

  useEffect(() => {
    // Simulate detecting user country (in real app, use IP geolocation)
    const detectedCountry = "IN"; // This would come from an API
    setUserCountry(detectedCountry);
    applyFilters();
  }, []);

  const handleAddToCart = (product: any) => {
    console.log("Add to cart:", product);
    // Add your cart logic here
  };

  const handleToggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const applyFilters = () => {
    let filtered = [...enhancedProducts];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product => 
        selectedSizes.some(size => product.name.toLowerCase().includes(size.toLowerCase()))
      );
    }

    // Store filter
    if (selectedStores.length > 0) {
      filtered = filtered.filter(product =>
        selectedStores.some(storeId => product.storeAvailability.includes(storeId))
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }

    // Price range filter
    filtered = filtered.filter(product => {
      const price = parseFloat(product.price.replace(/[^0-9.]/g, ''));
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Rating filter
    if (selectedRatings.length > 0) {
      filtered = filtered.filter(product => 
        selectedRatings.includes(Math.floor(product.rating || 0))
      );
    }

    // Availability filter
    if (selectedAvailability === "in-stock") {
      filtered = filtered.filter(product => product.inStock);
    } else if (selectedAvailability === "out-of-stock") {
      filtered = filtered.filter(product => !product.inStock);
    }

    // Apply sorting
    filtered = sortProducts(filtered, sortBy);

    setFilteredProducts(filtered);
  };

  const sortProducts = (products: any[], sortType: string) => {
    return [...products].sort((a, b) => {
      switch (sortType) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-low":
          return parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, ''));
        case "price-high":
          return parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, ''));
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "popularity":
          return (b.popularity || 0) - (a.popularity || 0);
        case "discount":
          return (b.discount || 0) - (a.discount || 0);
        default:
          return 0;
      }
    });
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleStoreToggle = (storeId: string) => {
    setSelectedStores(prev => 
      prev.includes(storeId) 
        ? prev.filter(s => s !== storeId)
        : [...prev, storeId]
    );
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleRatingToggle = (rating: number) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  const handlePriceRangeChange = (range: PriceRange) => {
    setPriceRange(range);
  };

  const handleSort = (sortType: string) => {
    setSortBy(sortType);
    const sortedProducts = sortProducts(filteredProducts, sortType);
    setFilteredProducts(sortedProducts);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleAvailabilityChange = (availability: string) => {
    setSelectedAvailability(availability);
  };

  const handleCountryChange = (country: string) => {
    setUserCountry(country);
    // Reset price range when country changes
    setPriceRange({ min: 0, max: 5000, label: "All" });
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedSizes([]);
    setSelectedStores([]);
    setSelectedBrands([]);
    setSelectedRatings([]);
    setSelectedAvailability("all");
    setPriceRange({ min: 0, max: 5000, label: "All" });
    setFilteredProducts(enhancedProducts);
    setSortBy("name");
  };

  // Apply filters whenever any filter state changes
  useEffect(() => {
    applyFilters();
  }, [
    searchTerm, 
    selectedCategory, 
    selectedSizes, 
    selectedStores, 
    selectedBrands, 
    selectedRatings, 
    selectedAvailability, 
    priceRange,
    sortBy
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              All Products
            </h1>
            <nav className="text-sm text-gray-600">
              <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-green-600">Products</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Sidebar - Filters */}
            <div className="lg:w-1/4 space-y-6">
              
              {/* Search Bar */}
              <div className="bg-white p-4 border border-gray-200 rounded-lg">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none text-gray-900 text-sm"
                  />
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Country Selection */}
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-lg mb-4 text-gray-900">Select Country</h3>
                <select 
                  value={userCountry}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                >
                  <option value="IN">India (₹ INR)</option>
                  <option value="US">United States ($ USD)</option>
                  <option value="AE">UAE (AED)</option>
                  <option value="EU">Europe (€ EUR)</option>
                </select>
              </div>

              {/* Store/Outlet Filter */}
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-lg mb-4 text-gray-900">Store/Outlet Location</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {storeLocations.map((store) => (
                    <label key={store.id} className="flex items-start space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedStores.includes(store.id)}
                        onChange={() => handleStoreToggle(store.id)}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1"
                      />
                      <div className="flex-1">
                        <span className={`text-sm font-medium group-hover:text-green-600 transition-colors ${
                          !store.isActive ? 'text-gray-400' : 'text-gray-700'
                        }`}>
                          {store.name}
                          {store.isActive && (
                            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                          )}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {store.address}, {store.city}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-lg mb-4 text-gray-900">Categories</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCategory === "all"}
                      onChange={() => handleCategoryFilter("all")}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-gray-700 text-sm group-hover:text-green-600 transition-colors">
                      All Products
                    </span>
                  </label>
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedCategory === category}
                        onChange={() => handleCategoryFilter(category)}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-gray-700 text-sm group-hover:text-green-600 transition-colors">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter by Price Range */}
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-lg mb-4 text-gray-900">Price Range</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={priceRange.min === 0 && priceRange.max === 5000}
                      onChange={() => setPriceRange({ min: 0, max: 5000, label: "All" })}
                      className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <span className="text-gray-700 text-sm group-hover:text-green-600 transition-colors">
                      All Prices
                    </span>
                  </label>
                  {currentPriceRanges.map((range, index) => (
                    <label key={index} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={priceRange.min === range.min && priceRange.max === range.max}
                        onChange={() => handlePriceRangeChange(range)}
                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <span className="text-gray-700 text-sm group-hover:text-green-600 transition-colors">
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter by Brand */}
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-lg mb-4 text-gray-900">Brands</h3>
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandToggle(brand)}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-gray-700 text-sm group-hover:text-green-600 transition-colors">
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter by Size */}
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-lg mb-4 text-gray-900">Filter by size</h3>
                <div className="grid grid-cols-2 gap-3">
                  {sizes.map((size) => (
                    <label key={size} className="flex items-center space-x-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedSizes.includes(size)}
                        onChange={() => handleSizeToggle(size)}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-gray-700 text-sm group-hover:text-green-600 transition-colors">
                        {size}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter by Rating */}
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-lg mb-4 text-gray-900">Customer Rating</h3>
                <div className="space-y-3">
                  {ratings.map((rating) => (
                    <label key={rating} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(rating)}
                        onChange={() => handleRatingToggle(rating)}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <div className="flex items-center space-x-2">
                        <div className="flex text-yellow-500 text-sm">
                          {"★".repeat(rating)}
                          {"☆".repeat(5 - rating)}
                        </div>
                        <span className="text-gray-700 text-sm group-hover:text-green-600 transition-colors">
                          & above
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter by Availability */}
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-lg mb-4 text-gray-900">Availability</h3>
                <div className="space-y-3">
                  {availabilityOptions.map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="availability"
                        checked={selectedAvailability === option.value}
                        onChange={() => handleAvailabilityChange(option.value)}
                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <span className="text-gray-700 text-sm group-hover:text-green-600 transition-colors">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset Filters Button */}
              <button
                onClick={resetFilters}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-300 transition-colors text-sm"
              >
                Reset All Filters
              </button>

              {/* Promotional Products */}
              <div className="space-y-4">
                <div className="bg-white p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="text-sm text-gray-500 mb-1">Fresh organic fruit (50gm)</div>
                  <div className="font-bold text-gray-900">$130.00 USD</div>
                </div>
                <div className="bg-white p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="text-sm text-gray-500 mb-1">Fresh & healthy food</div>
                  <div className="font-bold text-gray-900">$126.00 USD</div>
                </div>
              </div>

            </div>

            {/* Right Content - Products */}
            <div className="lg:w-3/4">
              
              {/* Sort Bar */}
              <div className="bg-white p-4 border border-gray-200 rounded-lg mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="text-sm text-gray-600">
                    Showing {filteredProducts.length} of {enhancedProducts.length} products
                    {selectedStores.length > 0 && (
                      <span className="ml-2 text-green-600">
                        (Filtered by {selectedStores.length} store{selectedStores.length > 1 ? 's' : ''})
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <select 
                      value={sortBy}
                      onChange={(e) => handleSort(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                    >
                      <option value="name">Name</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="popularity">Popularity</option>
                      <option value="discount">Discount</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Active Filters Display */}
              {(selectedCategory !== "all" || selectedSizes.length > 0 || selectedStores.length > 0 || selectedBrands.length > 0 || selectedRatings.length > 0 || priceRange.min > 0 || priceRange.max < 5000 || selectedAvailability !== "all") && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-blue-900 text-sm">Active Filters:</h4>
                    <button 
                      onClick={resetFilters}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory !== "all" && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                        Category: {selectedCategory}
                      </span>
                    )}
                    {selectedSizes.map(size => (
                      <span key={size} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                        Size: {size}
                      </span>
                    ))}
                    {selectedStores.map(storeId => {
                      const store = storeLocations.find(s => s.id === storeId);
                      return store ? (
                        <span key={storeId} className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                          Store: {store.name}
                        </span>
                      ) : null;
                    })}
                    {selectedBrands.map(brand => (
                      <span key={brand} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                        Brand: {brand}
                      </span>
                    ))}
                    {selectedRatings.map(rating => (
                      <span key={rating} className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">
                        Rating: {rating}+ stars
                      </span>
                    ))}
                    {(priceRange.min > 0 || priceRange.max < 5000) && (
                      <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                        Price: {priceRange.label}
                      </span>
                    )}
                    {selectedAvailability !== "all" && (
                      <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full">
                        {selectedAvailability === "in-stock" ? "In Stock" : "Out of Stock"}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id}
                      product={{
                        ...product,
                        isFavorite: favorites.includes(product.id),
                        discount: product.discount,
                        popularity: product.popularity
                      }}
                      onAddToCart={handleAddToCart}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
                
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                  <button
                    onClick={resetFilters}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}

              {/* Load More */}
              {filteredProducts.length > 0 && (
                <div className="text-center mt-8">
                  <button className="bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-8 rounded-lg border border-gray-300 transition-colors hover:border-gray-400">
                    Load More Products
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}