// app/routes/products.tsx
import React, { useState } from "react";
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

export default function Products() {
  const [filteredProducts, setFilteredProducts] = useState(defaultProducts);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = [
    "Boter's rock",
    "Bestseller", 
    "Breakfast",
    "Dairy & cheese",
    "Deal collection",
    "Dinner",
    "Featured product"
  ];

  const sizes = ["1kg", "2kg", "3kg", "4kg", "5kg"];

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

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === "all") {
      setFilteredProducts(defaultProducts);
    } else {
      const filtered = defaultProducts.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleSort = (sortType: string) => {
    setSortBy(sortType);
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      switch (sortType) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-low":
          return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
        case "price-high":
          return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });
    setFilteredProducts(sortedProducts);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term === "") {
      setFilteredProducts(defaultProducts);
    } else {
      const filtered = defaultProducts.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedSizes([]);
    setFilteredProducts(defaultProducts);
    setSortBy("name");
  };

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

              {/* Filter by Price */}
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-lg mb-4 text-gray-900">Filter by price</h3>
                <div className="space-y-4">
                  <div className="text-sm text-gray-600 leading-relaxed">
                    Prossent dapibus, neque id cursus bichius, tortor neque 
                    egestas augue, eu vulputate magna eros eu erat. Aliquam 
                    erat volutpat. Nam dui mi, tincidunt quis, facilisis luc...
                  </div>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        className="w-8 h-8 border border-gray-300 rounded text-sm text-gray-700 hover:border-green-600 hover:text-green-600 transition-colors"
                      >
                        ({num})
                      </button>
                    ))}
                  </div>
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
                    Showing {filteredProducts.length} of {defaultProducts.length} products
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
                    </select>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id}
                      product={{
                        ...product,
                        isFavorite: favorites.includes(product.id)
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