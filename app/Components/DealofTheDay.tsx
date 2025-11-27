// app/components/DealOfTheDay.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

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
}

const DealOfTheDay: React.FC<DealOfTheDayProps> = ({
  product,
  onAddToCart,
  onToggleFavorite,
}) => {
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
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

  return (
    <div className="border border-[#E5E5E5] bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full p-4 group cursor-pointer">
      {/* Header with Timer */}
      <div className="flex justify-between items-start mb-4">
        <span className="bg-[#6B8E23] text-white px-3 py-1.5 rounded text-xs font-bold">
          Deal of the day
        </span>
        <div className="text-right flex gap-1">
          {["DAY", "HRS", "MIN", "SEC"].map((unit, index) => (
            <div key={unit} className="text-center">
              <div className="bg-white text-[#333333] border border-[#E5E5E5] px-2 py-1 rounded font-mono font-bold text-xs min-w-[2rem]">
                {product.timer.split(" ")[index]}
              </div>
              <div className="text-[#696969] text-[9px] mt-1 font-medium">{unit}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Image with Favorite Button */}
      <div className="relative w-full h-48 flex items-center justify-center bg-white border border-[#E5E5E5] rounded-lg mb-4 p-4 group">
        <Link 
          to={`/products/${product.slug}`}
          className="w-full h-full flex items-center justify-center"
          onClick={handleProductClick}
        >
          <span className="text-6xl transition-transform duration-300 group-hover:scale-110" role="img" aria-label={product.name}>
            {product.image}
          </span>
        </Link>
        
        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
        >
          {product.isFavorite ? (
            <FaHeart className="text-[#DC143C] w-4 h-4" />
          ) : (
            <FaRegHeart className="text-gray-400 hover:text-[#DC143C] w-4 h-4" />
          )}
        </button>
      </div>

      {/* Product Name */}
      <Link 
        to={`/products/${product.slug}`}
        onClick={handleProductClick}
        className="block"
      >
        <h3 className="font-bold text-[#333333] text-lg mb-2 leading-tight line-clamp-2 hover:text-[#6B8E23] transition-colors">
          {product.name}
        </h3>
      </Link>

      {/* Price */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[#DC143C] font-bold text-lg">{product.price}</span>
        {product.originalPrice && (
          <span className="text-[#696969] line-through text-sm">{product.originalPrice}</span>
        )}
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        disabled={!product.inStock}
        className="w-full bg-[#6B8E23] hover:bg-[#5A7A1A] disabled:bg-[#E5E5E5] text-white font-semibold py-2.5 rounded text-sm transition-colors duration-200 disabled:cursor-not-allowed"
      >
        {product.inStock ? "Add to Cart" : "Out of Stock"}
      </button>

      {/* View Details Link */}
      <Link 
        to={`/products/${product.slug}`}
        onClick={handleProductClick}
        className="text-center text-[#6B8E23] hover:text-[#5A7A1A] font-medium text-sm mt-3 transition-colors"
      >
        View Details →
      </Link>
    </div>
  );
};

// DealOfTheDay Section Component
export const DealOfTheDaySection: React.FC = () => {
  const navigate = useNavigate();

  const handleAddToCart = (product: DealProduct) => {
    console.log("Added to cart:", product);
    // Add your cart logic here
  };

  const handleToggleFavorite = (productId: number) => {
    console.log("Toggled favorite for product:", productId);
    // Add your favorite logic here
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Deal of the Day</h2>
            <p className="text-gray-600">Limited time offers. Don't miss out!</p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {defaultDealProducts.slice(0, 3).map((product) => (
            <DealOfTheDay
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Data array
export const defaultDealProducts: DealProduct[] = [
  {
    id: 1,
    slug: "mung-beans-premium",
    name: "Premium Organic Mung Beans",
    price: "€31.00",
    originalPrice: "€38.00",
    image: "🫘",
    images: ["🫘", "🌱", "🥣"],
    timer: "729 12 55 27",
    inStock: true,
    isFavorite: false,
    category: "Organic Beans",
    description: "Premium quality organic mung beans, carefully selected for their excellent nutritional value and taste. Rich in protein, fiber, and essential nutrients, these beans are perfect for sprouting, cooking traditional dishes, or adding to salads and soups.",
    features: [
      "100% Organic Certified",
      "Rich in Protein and Fiber",
      "Perfect for Sprouting",
      "Non-GMO Project Verified",
      "Excellent for Asian Cuisine"
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
    ingredients: "100% Organic Mung Beans",
    badge: "Sale"
  },
  {
    id: 2,
    slug: "natural-soyabean-organic",
    name: "Natural Organic Soyabean",
    price: "€14.00",
    originalPrice: "€18.00",
    image: "🌱",
    images: ["🌱", "🫘", "🥛"],
    timer: "729 12 55 27",
    inStock: true,
    isFavorite: false,
    category: "Organic Beans",
    description: "High-quality organic soybeans packed with complete protein and essential amino acids. Ideal for making tofu, soy milk, tempeh, or incorporating into various dishes for a nutritional boost.",
    features: [
      "Complete Protein Source",
      "Rich in Essential Amino Acids",
      "Perfect for Tofu & Soy Milk",
      "USDA Organic Certified",
      "Versatile Cooking Uses"
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
    ingredients: "100% Organic Soybeans",
    badge: "Hot"
  },
  {
    id: 3,
    slug: "red-beans-premium",
    name: "Premium Red Kidney Beans",
    price: "€31.00",
    originalPrice: "€35.00",
    image: "🫘",
    images: ["🫘", "🍲", "🥗"],
    timer: "729 12 55 27",
    inStock: true,
    isFavorite: false,
    category: "Beans & Legumes",
    description: "High-quality red kidney beans with excellent texture and flavor. Perfect for chili, stews, salads, and traditional recipes. Rich in iron, antioxidants, and dietary fiber.",
    features: [
      "Excellent Source of Iron",
      "High in Antioxidants",
      "Perfect for Chili & Stews",
      "Rich Dietary Fiber",
      "Long Shelf Life"
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
    ingredients: "100% Red Kidney Beans",
    badge: "Sale"
  }
];

export default DealOfTheDay;