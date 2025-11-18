// app/components/ProductCard.tsx
import React from "react";
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
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddToCart?.(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(product.id);
  };

  return (
    <div className="border border-[#E5E5E5] bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full">

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

        {/* Favorite Button */}
        <div className="absolute top-3 right-3">
          <button
            onClick={handleToggleFavorite}
            className="w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition border border-[#E5E5E5]"
            aria-label={
              product.isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <svg
              className={`w-4 h-4 transition-colors ${
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



  );
};

export const defaultProducts: Product[] = [
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
];

export default ProductCard;