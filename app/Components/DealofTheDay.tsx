// app/components/DealOfTheDay.tsx
import React from "react";
import { Link } from "react-router-dom";

export interface DealProduct {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  timer: string;
  inStock?: boolean;
  isFavorite?: boolean;
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
    <div className="border border-[#E5E5E5] bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full p-4">
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

      {/* Product Image */}
      <div className="w-full h-48 flex items-center justify-center bg-white border border-[#E5E5E5] rounded-lg mb-4 p-4">
        <span className="text-6xl" role="img" aria-label={product.name}>
          {product.image}
        </span>
      </div>

      {/* Product Name */}
      <h3 className="font-bold text-[#333333] text-lg mb-2 leading-tight line-clamp-2">
        {product.name}
      </h3>

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
        className="w-full bg-[#6B8E23] hover:bg-[#5A7A1A] disabled:bg-[#E5E5E5] text-white font-semibold py-2.5 rounded text-sm transition-colors duration-200"
      >
        {product.inStock ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
};

// Data array inside the component
export const defaultDealProducts: DealProduct[] = [
  {
    id: 1,
    name: "Mung beans",
    price: "€31.00",
    image: "🫘",
    timer: "729 12 55 27",
    inStock: true,
    isFavorite: false,
  },
  {
    id: 2,
    name: "Natural soyabean",
    price: "€14.00",
    image: "🌱",
    timer: "729 12 55 27",
    inStock: true,
    isFavorite: false,
  },
  {
    id: 3,
    name: "Red beans",
    price: "€31.00",
    image: "🫘",
    timer: "729 12 55 27",
    inStock: true,
    isFavorite: false,
  },
];

export default DealOfTheDay;