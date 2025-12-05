// app/components/DealOfTheDay.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShoppingBag, FaEye, FaStar } from "react-icons/fa";

export interface DealProduct {
  id: number;
  slug: string;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  timer: string;
  inStock?: boolean;
  isFavorite?: boolean;
  category?: string;
  description?: string;
  images?: string[];
  features?: string[];
  nutrition?: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
  weight?: string;
  origin?: string;
  storage?: string;
  rating?: number;
  reviews?: number;
  badge?: string;
  reviewCount?: number;
  ingredients?: string;
}

interface DealOfTheDayProps {
  product: DealProduct;
  onAddToCart?: (product: DealProduct) => void;
  onToggleFavorite?: (productId: number) => void;
  onOpenCart?: () => void;
}

const DealOfTheDay: React.FC<DealOfTheDayProps> = ({
  product,
  onAddToCart,
  onToggleFavorite,
  onOpenCart,
}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
    if (onOpenCart) {
      setTimeout(() => onOpenCart(), 300);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(product.id);
  };

  const handleProductClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/products/${product.slug}`);
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = '/wishlist';
  };

  // Parse timer values from the string "729 12 55 27"
  const timerValues = product.timer.split(" ");

  // Render star rating
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`w-3 h-3 ${
              star <= Math.floor(rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col">
        {/* Main Card Container */}
        <div 
          className="bg-white rounded-lg flex flex-col h-full relative group transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-xl p-4 border border-[#E5E5E5]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Vertical Action Icons - Always Visible */}
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-10">
            {/* Add to Cart Icon */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-8 h-8 bg-white border border-[#E5E5E5] hover:border-[#222222] hover:bg-[#222222] rounded-full flex items-center justify-center transition-all duration-300 ease-out transform hover:scale-110 shadow-sm"
              aria-label="Add to cart"
            >
              <FaShoppingBag className="w-3 h-3 text-[#666666] hover:text-white transition-all duration-300" />
            </button>

            {/* View Icon */}
            <button
              onClick={handleViewClick}
              className="w-8 h-8 bg-white border border-[#E5E5E5] hover:border-[#ff6333] hover:bg-[#ff6333] rounded-full flex items-center justify-center transition-all duration-300 ease-out transform hover:scale-110 shadow-sm"
              aria-label="Quick view"
            >
              <FaEye className="w-3 h-3 text-[#666666] hover:text-white transition-all duration-300" />
            </button>

            {/* Favorite Button */}
            <button
              onClick={handleWishlistClick}
              className="w-8 h-8 bg-white border border-[#E5E5E5] hover:border-red-500 hover:bg-red-500 rounded-full flex items-center justify-center transition-all duration-300 ease-out transform hover:scale-110 shadow-sm"
              aria-label="Add to wishlist"
            >
              <FaHeart className={`w-3 h-3 transition-all duration-300 ${
                product.isFavorite 
                  ? "text-red-600" 
                  : "text-[#666666] hover:text-white"
              }`} />
            </button>
          </div>

          {/* Product Image */}
          <div className="relative w-full h-32 flex items-center justify-center bg-white mb-3">
            <Link 
              to={`/products/${product.slug}`}
              className="w-full h-full flex items-center justify-center"
              onClick={handleProductClick}
            >
              <span className={`text-5xl transition-all duration-300 ease-out ${
                isHovered ? 'scale-110' : 'scale-100'
              }`} role="img" aria-label={product.name}>
                {product.image}
              </span>
            </Link>
          </div>

          {/* Product Name */}
          <Link 
            to={`/products/${product.slug}`}
            onClick={handleProductClick}
            className="block mb-2 flex-grow"
          >
            <h3 className="font-semibold text-[#222222] text-base text-center leading-tight transition-colors duration-300 hover:text-[#ff9933]">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center justify-center gap-1 mb-2">
              {renderRating(product.rating)}
              {product.reviewCount && (
                <span className="text-[#666666] text-xs ml-1">
                  ({product.reviewCount})
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-[#f52b07] font-bold text-lg">{product.price}</span>
            {product.originalPrice && (
              <span className="text-[#888888] line-through text-sm">{product.originalPrice}</span>
            )}
          </div>
        </div>

        {/* Timer Section - Directly Below Card */}
        <div className="flex justify-center items-center gap-2 mt-3">
          {timerValues.map((value, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-white text-[#222222] font-mono font-bold text-xs px-2 py-1 min-w-[2rem] text-center rounded border border-[#E5E5E5]">
                {value}
              </div>
              <div className="text-[#666666] text-[9px] font-medium mt-1 uppercase">
                {["DAY", "HRS", "MIN", "SEC"][index]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-95 opacity-0 animate-in fade-in-0 zoom-in-95"
            style={{ animation: 'modalEnter 0.3s ease-out forwards' }}
          >
            <style>
              {`
                @keyframes modalEnter {
                  from {
                    opacity: 0;
                    transform: scale(0.95);
                  }
                  to {
                    opacity: 1;
                    transform: scale(1);
                  }
                }
              `}
            </style>
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#E5E5E5]">
              <h2 className="text-2xl font-bold text-[#222222]">Quick View</h2>
              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#f8f8f8] transition-colors duration-200"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6 text-[#666666]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-sm bg-white rounded-xl p-8 border border-[#E5E5E5]">
                    <div className="aspect-square flex items-center justify-center">
                      <span className="text-9xl" role="img" aria-label={product.name}>
                        {product.image}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                  {/* Product Name */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-[#222222] mb-2">
                        {product.name}
                      </h1>
                      {product.badge && (
                        <span className="px-3 py-1 text-sm font-bold text-white rounded-lg bg-[#ff9933]">
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center gap-1">
                        {renderRating(product.rating)}
                      </div>
                      {product.reviewCount && (
                        <span className="text-[#666666] text-sm">
                          ({product.reviewCount} reviews)
                        </span>
                      )}
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-[#c72c11]">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xl text-[#888888] line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Short Description */}
                  <div className="border-t border-b border-[#E5E5E5] py-4">
                    <p className="text-[#666666] leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-[#222222]">Category:</span>
                      <span className="text-[#666666]">{product.category}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-[#222222]">Weight:</span>
                      <span className="text-[#666666]">{product.weight}</span>
                    </div>
                  </div>

                  {/* Timer in Modal */}
                  <div className="flex justify-center items-center gap-4 py-4 border-t border-b border-[#E5E5E5]">
                    <span className="text-[#222222] font-semibold">Deal Ends In:</span>
                    {timerValues.map((value, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="bg-[#f8f8f8] text-[#222222] font-mono font-bold text-sm px-3 py-2 min-w-[3rem] text-center rounded-lg">
                          {value}
                        </div>
                        <div className="text-[#666666] text-[10px] font-medium mt-1 uppercase">
                          {["DAY", "HRS", "MIN", "SEC"][index]}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-4">
                    <Link
                      to={`/products/${product.slug}`}
                      onClick={closeModal}
                      className="flex-1 bg-[#222222] hover:bg-black text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={(e) => {
                        handleAddToCart(e);
                        closeModal();
                      }}
                      disabled={!product.inStock}
                      className="flex-1 bg-[#ec3a04] hover:bg-[#e6562a] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// DealOfTheDay Section Component
export const DealOfTheDaySection: React.FC<{
  onOpenCart?: () => void;
}> = ({ onOpenCart }) => {
  const navigate = useNavigate();

  const handleAddToCart = (product: DealProduct) => {
    console.log("Added to cart:", product);
  };

  const handleToggleFavorite = (productId: number) => {
    console.log("Toggled favorite for product:", productId);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#222222] mb-2">
              Deal of the day
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center justify-center bg-[#222222] text-white font-semibold text-base px-6 py-3 rounded-lg transition-all duration-300 hover:bg-black"
          >
            ALL PRODUCTS
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Products Grid - Reduced Gap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {defaultDealProducts.map((product) => (
            <DealOfTheDay
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              onOpenCart={onOpenCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Data array with ratings
export const defaultDealProducts: DealProduct[] = [
  {
    id: 1,
    slug: "mung-beans",
    name: "Mung beans",
    price: "€31.00",
    image: "🫘",
    images: ["🫘"],
    timer: "729 12 55 27",
    inStock: true,
    isFavorite: false,
    category: "Beans",
    description: "Premium quality organic mung beans, carefully selected for their excellent nutritional value and taste. Rich in protein, fiber, and essential nutrients.",
    features: [
      "100% Organic Certified",
      "Rich in Protein and Fiber",
      "Perfect for Sprouting",
      "Non-GMO Project Verified"
    ],
    nutrition: {
      calories: "347 kcal",
      protein: "24g",
      carbs: "63g",
      fat: "1.2g"
    },
    weight: "500g",
    origin: "India",
    storage: "Cool, dry place",
    rating: 4.5,
    reviews: 128,
    reviewCount: 128,
    ingredients: "100% Mung Beans",
   
  },
  {
    id: 2,
    slug: "natural-soyabean",
    name: "Natural soyabean",
    price: "€14.00",
    image: "🌱",
    images: ["🌱"],
    timer: "729 12 55 27",
    inStock: true,
    isFavorite: false,
    category: "Beans",
    description: "High-quality organic soybeans packed with complete protein and essential amino acids. Ideal for making tofu, soy milk, tempeh.",
    features: [
      "Complete Protein Source",
      "Rich in Essential Amino Acids",
      "Perfect for Tofu & Soy Milk",
      "USDA Organic Certified"
    ],
    nutrition: {
      calories: "446 kcal",
      protein: "36g",
      carbs: "30g",
      fat: "20g"
    },
    weight: "500g",
    origin: "USA",
    storage: "Cool, dry place",
    rating: 4.3,
    reviews: 89,
    reviewCount: 89,
    ingredients: "100% Soyabeans",
   
  },
  {
    id: 3,
    slug: "red-beans",
    name: "Red beans",
    price: "€31.00",
    image: "🫘",
    images: ["🫘"],
    timer: "729 12 55 27",
    inStock: true,
    isFavorite: false,
    category: "Beans",
    description: "High-quality red kidney beans with excellent texture and flavor. Perfect for chili, stews, salads, and traditional recipes.",
    features: [
      "Excellent Source of Iron",
      "High in Antioxidants",
      "Perfect for Chili & Stews",
      "Rich Dietary Fiber"
    ],
    nutrition: {
      calories: "337 kcal",
      protein: "22g",
      carbs: "61g",
      fat: "1.1g"
    },
    weight: "500g",
    origin: "Mexico",
    storage: "Cool, dry place",
    rating: 4.7,
    reviews: 156,
    reviewCount: 156,
    ingredients: "100% Red Beans",
   
  }
];

export default DealOfTheDay;