// app/components/QuantitySelector.tsx
import React from "react";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  size = "md",
  disabled = false
}) => {
  // Size classes
  const sizeClasses = {
    sm: "w-20 h-8 text-sm",
    md: "w-24 h-10 text-base",
    lg: "w-28 h-12 text-lg"
  };

  const buttonSizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10"
  };

  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      if (value < min) {
        onQuantityChange(min);
      } else if (value > max) {
        onQuantityChange(max);
      } else {
        onQuantityChange(value);
      }
    } else if (e.target.value === "") {
      onQuantityChange(min);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "" || parseInt(e.target.value) < min) {
      onQuantityChange(min);
    }
  };

  return (
    <div className={`flex items-center border border-gray-300 rounded-lg bg-white ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      {/* Decrease Button */}
      <button
        type="button"
        onClick={handleDecrease}
        disabled={disabled || quantity <= min}
        className={`flex items-center justify-center text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-l-lg transition-colors ${
          disabled || quantity <= min ? 'cursor-not-allowed opacity-50' : ''
        } ${buttonSizeClasses[size]}`}
        aria-label="Decrease quantity"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>

      {/* Quantity Input */}
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={quantity}
        onChange={handleInputChange}
        onBlur={handleBlur}
        disabled={disabled}
        className="flex-1 text-center border-0 bg-transparent focus:outline-none focus:ring-0 font-medium text-gray-800"
        aria-label="Quantity"
      />

      {/* Increase Button */}
      <button
        type="button"
        onClick={handleIncrease}
        disabled={disabled || quantity >= max}
        className={`flex items-center justify-center text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-r-lg transition-colors ${
          disabled || quantity >= max ? 'cursor-not-allowed opacity-50' : ''
        } ${buttonSizeClasses[size]}`}
        aria-label="Increase quantity"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default QuantitySelector;