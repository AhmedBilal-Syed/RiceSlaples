// app/components/ProductCard.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating?: number;
  reviewCount?: number;
  badge?: "Hot" | "New" | "Sale" | "Organic";
  category?: string;
  inStock?: boolean;
  isFavorite?: boolean;
  slug: string;
  description: string;
  weight: string;
  ingredients: string;
  nutritionalInfo: {
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
  };
  images: string[];
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleFavorite,
}) => {
  const [showViewIcon, setShowViewIcon] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddToCart?.(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(product.id);
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div 
        className="border border-[#E5E5E5] bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full relative"
        onMouseEnter={() => setShowViewIcon(true)}
        onMouseLeave={() => setShowViewIcon(false)}
      >
        {/* Image Section */}
        <div className="relative h-56 overflow-hidden rounded-t-lg">
          <Link to={`/products/${product.slug}`} className="block w-full h-full">
            <div className="w-full h-full flex items-center justify-center p-4 bg-white">
              <span
                className="text-7xl transition-transform duration-300 hover:scale-110"
                role="img"
                aria-label={product.name}
              >
                {product.image}
              </span>
            </div>
          </Link>

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <span
                className={`px-2 py-1 text-xs font-bold text-white rounded ${
                  product.badge === "Hot" || product.badge === "Sale"
                    ? "bg-[#DC143C]"
                    : product.badge === "New"
                    ? "bg-[#6B8E23]"
                    : "bg-[#6B8E23]"
                }`}
              >
                {product.badge}
              </span>
            </div>
          )}

          {/* View Icon - Shows on hover */}
          <div className={`absolute top-3 right-12 transition-all duration-300 transform ${
            showViewIcon 
              ? 'opacity-100 scale-100 translate-x-0' 
              : 'opacity-0 scale-50 translate-x-4'
          }`}>
            <button
              onClick={handleViewClick}
              className="w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 border border-[#E5E5E5] hover:border-[#6B8E23] hover:bg-[#6B8E23] group"
              aria-label="Quick view"
            >
              <svg
                className="w-4 h-4 text-[#696969] group-hover:text-white transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>

          {/* Favorite Button */}
          <div className="absolute top-3 right-3">
            <button
              onClick={handleToggleFavorite}
              className="w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 border border-[#E5E5E5] hover:border-red-500"
              aria-label={
                product.isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <svg
                className={`w-4 h-4 transition-colors duration-200 ${
                  product.isFavorite
                    ? "fill-red-600 text-red-600"
                    : "fill-none text-[#696969] hover:text-red-600"
                }`}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          {/* Out of Stock */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
              <span className="text-white text-xs font-bold bg-black/70 px-3 py-1.5 rounded">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Category */}
          {product.category && (
            <p className="text-xs text-[#696969] uppercase tracking-wider mb-1">
              {product.category}
            </p>
          )}

          {/* Name */}
          <Link to={`/products/${product.slug}`} className="flex-grow group">
            <h3 className="font-bold text-[#333333] text-lg leading-tight line-clamp-2 group-hover:text-[#6B8E23] transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mt-2">
              <div className="flex text-yellow-500 text-sm">
                {"★".repeat(Math.floor(product.rating))}
                {"☆".repeat(5 - Math.floor(product.rating))}
              </div>
              {product.reviewCount && (
                <span className="text-[#696969] text-xs ml-1">
                  ({product.reviewCount})
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[#DC143C] font-bold text-lg">{product.price}</span>
            {product.originalPrice && (
              <span className="text-[#696969] line-through text-sm">
                {product.originalPrice}
              </span>
            )}
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full bg-[#6B8E23] hover:bg-[#5A7A1A] disabled:bg-[#E5E5E5] text-white font-semibold py-2.5 rounded text-sm mt-3 transition-colors duration-200"
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
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
              <h2 className="text-2xl font-bold text-[#333333]">Quick View</h2>
              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F5F5DC] transition-colors duration-200"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6 text-[#696969]"
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
                  {/* Product Name & Badge */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-[#333333] mb-2">
                        {product.name}
                      </h1>
                      {product.badge && (
                        <span className={`px-3 py-1 text-sm font-bold text-white rounded ${
                          product.badge === "Hot" || product.badge === "Sale"
                            ? "bg-[#DC143C]"
                            : "bg-[#6B8E23]"
                        }`}>
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-500 text-lg">
                        {"★".repeat(Math.floor(product.rating))}
                        {"☆".repeat(5 - Math.floor(product.rating))}
                      </div>
                      {product.reviewCount && (
                        <span className="text-[#696969] text-sm">
                          ({product.reviewCount} reviews)
                        </span>
                      )}
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-[#DC143C]">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xl text-[#696969] line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Short Description */}
                  <div className="border-t border-b border-[#E5E5E5] py-4">
                    <p className="text-[#696969] leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-[#333333]">Category:</span>
                      <span className="text-[#696969]">{product.category}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-[#333333]">Weight:</span>
                      <span className="text-[#696969]">{product.weight}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-4">
                    <Link
                      to={`/products/${product.slug}`}
                      onClick={closeModal}
                      className="flex-1 bg-[#6B8E23] hover:bg-[#5A7A1A] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={(e) => {
                        handleAddToCart(e);
                        closeModal();
                      }}
                      disabled={!product.inStock}
                      className="flex-1 bg-[#DC143C] hover:bg-[#C1121F] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
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

export const defaultProducts: Product[] = [
  // ... (your existing products array remains the same)
  {
    id: 1,
    name: "Red beans",
    price: "€31.00",
    image: "🫘",
    rating: 4.5,
    reviewCount: 128,
    badge: "Hot",
    inStock: true,
    isFavorite: false,
    slug: "red-beans",
    description: "Premium quality red beans, rich in protein and fiber. Perfect for soups, stews, and traditional dishes.",
    category: "Legumes",
    weight: "500g",
    ingredients: "100% Natural Red Beans",
    nutritionalInfo: {
      protein: "22g",
      carbs: "60g",
      fat: "1g",
      fiber: "16g"
    },
    images: ["🫘", "🫘", "🫘"]
  },
  {
    id: 2,
    name: "Almonds whole",
    price: "€14.00",
    image: "🌰",
    rating: 4.8,
    reviewCount: 95,
    badge: "Organic",
    inStock: true,
    isFavorite: false,
    slug: "almonds-whole",
    description: "Organic whole almonds, packed with nutrients and perfect for snacking or cooking.",
    category: "Nuts",
    weight: "250g",
    ingredients: "100% Organic Almonds",
    nutritionalInfo: {
      protein: "21g",
      carbs: "22g",
      fat: "49g",
      fiber: "12g"
    },
    images: ["🌰", "🌰", "🌰"]
  },
  {
    id: 3,
    name: "Mogra kesar",
    price: "€35.00",
    originalPrice: "€54.00",
    image: "🌼",
    rating: 4.3,
    reviewCount: 76,
    badge: "Sale",
    inStock: true,
    isFavorite: false,
    slug: "mogra-kesar",
    description: "Exquisite Mogra Kesar flowers, known for their aromatic fragrance and premium quality.",
    category: "Spices & Herbs",
    weight: "100g",
    ingredients: "100% Pure Mogra Kesar Flowers",
    nutritionalInfo: {
      protein: "5g",
      carbs: "18g",
      fat: "2g",
      fiber: "8g"
    },
    images: ["🌼", "🌼", "🌼"]
  },
  {
    id: 4,
    name: "Star anise",
    price: "€17.00",
    originalPrice: "€26.08",
    image: "✨",
    rating: 4.6,
    reviewCount: 201,
    badge: "Hot",
    inStock: true,
    isFavorite: false,
    slug: "star-anise",
    description: "Aromatic star anise with a distinct licorice flavor, perfect for Asian cuisine and spice blends.",
    category: "Spices & Herbs",
    weight: "50g",
    ingredients: "100% Natural Star Anise",
    nutritionalInfo: {
      protein: "18g",
      carbs: "50g",
      fat: "16g",
      fiber: "15g"
    },
    images: ["✨", "✨", "✨"]
  },
  {
    id: 5,
    name: "Red chili",
    price: "€31.00",
    image: "🌶️",
    rating: 4.2,
    reviewCount: 89,
    inStock: true,
    isFavorite: false,
    slug: "red-chili",
    description: "Fiery red chili peppers, adding heat and flavor to your favorite dishes.",
    category: "Spices & Herbs",
    weight: "100g",
    ingredients: "100% Dried Red Chili",
    nutritionalInfo: {
      protein: "12g",
      carbs: "40g",
      fat: "5g",
      fiber: "14g"
    },
    images: ["🌶️", "🌶️", "🌶️"]
  },
  {
    id: 6,
    name: "Organic quinoa",
    price: "€28.00",
    originalPrice: "€35.00",
    image: "🌾",
    rating: 4.7,
    reviewCount: 156,
    badge: "New",
    inStock: true,
    isFavorite: false,
    slug: "organic-quinoa",
    description: "Premium organic quinoa, packed with protein and essential amino acids. Perfect for healthy meals and salads.",
    category: "Grains",
    weight: "400g",
    ingredients: "100% Organic Quinoa",
    nutritionalInfo: {
      protein: "14g",
      carbs: "64g",
      fat: "6g",
      fiber: "7g"
    },
    images: ["🌾", "🌾", "🌾"]
  },
  {
    id: 7,
    name: "Cashew nuts",
    price: "€42.00",
    image: "🥜",
    rating: 4.9,
    reviewCount: 203,
    badge: "Organic",
    inStock: true,
    isFavorite: false,
    slug: "cashew-nuts",
    description: "Creamy and delicious cashew nuts, perfect for snacking, cooking, or making dairy-free alternatives.",
    category: "Nuts",
    weight: "300g",
    ingredients: "100% Organic Cashew Nuts",
    nutritionalInfo: {
      protein: "18g",
      carbs: "30g",
      fat: "44g",
      fiber: "3g"
    },
    images: ["🥜", "🥜", "🥜"]
  },
  {
    id: 8,
    name: "Turmeric powder",
    price: "€12.00",
    originalPrice: "€18.00",
    image: "🟡",
    rating: 4.4,
    reviewCount: 178,
    badge: "Sale",
    inStock: true,
    isFavorite: false,
    slug: "turmeric-powder",
    description: "Pure turmeric powder with vibrant color and rich flavor. Known for its anti-inflammatory properties.",
    category: "Spices & Herbs",
    weight: "100g",
    ingredients: "100% Pure Turmeric",
    nutritionalInfo: {
      protein: "8g",
      carbs: "65g",
      fat: "10g",
      fiber: "21g"
    },
    images: ["🟡", "🟡", "🟡"]
  },
  {
    id: 9,
    name: "Organic honey",
    price: "€24.00",
    image: "🍯",
    rating: 4.8,
    reviewCount: 267,
    badge: "Organic",
    inStock: true,
    isFavorite: false,
    slug: "organic-honey",
    description: "Pure organic honey with natural sweetness and health benefits. Perfect for teas, baking, and natural remedies.",
    category: "Sweeteners",
    weight: "500g",
    ingredients: "100% Organic Honey",
    nutritionalInfo: {
      protein: "0.3g",
      carbs: "82g",
      fat: "0g",
      fiber: "0.2g"
    },
    images: ["🍯", "🍯", "🍯"]
  },
  {
    id: 10,
    name: "Black pepper",
    price: "€15.00",
    originalPrice: "€22.00",
    image: "⚫",
    rating: 4.5,
    reviewCount: 189,
    badge: "Hot",
    inStock: true,
    isFavorite: false,
    slug: "black-pepper",
    description: "Freshly ground black pepper with robust flavor and aroma. Essential for enhancing any dish.",
    category: "Spices & Herbs",
    weight: "80g",
    ingredients: "100% Black Pepper Corns",
    nutritionalInfo: {
      protein: "10g",
      carbs: "64g",
      fat: "3g",
      fiber: "25g"
    },
    images: ["⚫", "⚫", "⚫"]
  }
];

export default ProductCard;