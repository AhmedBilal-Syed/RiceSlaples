// app/components/Categories.tsx
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Category {
  id: number;
  name: string;
  productCount: string;
  icon: string;
  link: string;
  gradient?: string;
}

interface CategoriesProps {
  title?: string;
  subtitle?: string;
  categories?: Category[];
}

const Categories: React.FC<CategoriesProps> = ({
  title = "Shop by category",
  subtitle = "Explore our carefully curated selection of premium food categories",
  categories,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const defaultCategories: Category[] = [
    {
      id: 1,
      name: "Dairy & Cheese",
      productCount: "22+ Product",
      icon: "🧀",
      link: "/products?category=dairy",
      gradient: "bg-gradient-to-br from-white to-gray-50",
    },
    {
      id: 2,
      name: "Organic Dry Fruits",
      productCount: "22+ Product",
      icon: "🥜",
      link: "/products?category=dryfruit",
      gradient: "bg-gradient-to-br from-white to-gray-50",
    },
    {
      id: 3,
      name: "Green Seafood",
      productCount: "22+ Product",
      icon: "🐟",
      link: "/products?category=seafood",
      gradient: "bg-gradient-to-br from-white to-gray-50",
    },
    {
      id: 4,
      name: "Organic Juice",
      productCount: "22+ Product",
      icon: "🧃",
      link: "/products?category=juice",
      gradient: "bg-gradient-to-br from-white to-gray-50",
    },
    {
      id: 5,
      name: "Sea & Fish",
      productCount: "22+ Product",
      icon: "🐠",
      link: "/products?category=fish",
      gradient: "bg-gradient-to-br from-white to-gray-50",
    },
    {
      id: 6,
      name: "Fresh Fruits",
      productCount: "22+ Product",
      icon: "🍎",
      link: "/products?category=fruits",
      gradient: "bg-gradient-to-br from-white to-gray-50",
    },
    {
      id: 7,
      name: "Organic Vegetables",
      productCount: "18+ Product",
      icon: "🥦",
      link: "/products?category=vegetables",
      gradient: "bg-gradient-to-br from-white to-gray-50",
    },
    {
      id: 8,
      name: "Premium Rice",
      productCount: "15+ Product",
      icon: "🍚",
      link: "/products?category=rice",
      gradient: "bg-gradient-to-br from-white to-gray-50",
    },
  ];

  const displayCategories = categories || defaultCategories;

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons(); // Initial check
      
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
      };
    }
  }, []);

  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#333333] mb-4 tracking-normal">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[#696969] text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Categories Container with Scroll */}
        <div className="relative">
          {/* Left Scroll Arrow */}
          {showLeftArrow && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-[#6B8E23] w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl -ml-2 sm:-ml-4"
              aria-label="Scroll left"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Categories Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-4 sm:space-x-6 overflow-x-auto scroll-smooth pb-4 -mb-4 px-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <style>
              {`
                .flex::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            {displayCategories.map((category, index) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                index={index}
              />
            ))}
          </div>

          {/* Right Scroll Arrow */}
          {showRightArrow && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-[#6B8E23] w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl -mr-2 sm:-mr-4"
              aria-label="Scroll right"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Scroll Indicator Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {[0, 1].map((dot) => (
            <div
              key={dot}
              className="w-1.5 h-1.5 rounded-full bg-[#E5E5E5] transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const CategoryCard: React.FC<{ category: Category; index: number }> = ({ category, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100); // Staggered animation

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`flex-shrink-0 w-48 sm:w-56 transform transition-all duration-500 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4'
      }`}
    >
      <Link
        to={category.link}
        className="group block text-center p-4 sm:p-6 rounded-xl bg-[#F5F5DC] border border-[#E5E5E5] hover:border-[#6B8E23] shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6B8E23] focus:ring-opacity-50 hover:scale-105"
        aria-label={`Browse ${category.name} category with ${category.productCount}`}
      >
        <div className="relative mb-4 sm:mb-6">
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-sm ${
              category.gradient || "bg-white"
            }`}
          >
            <span
              className="text-2xl sm:text-3xl transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              role="img"
              aria-label={category.name}
            >
              {category.icon}
            </span>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-[#6B8E23] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-8"></div>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <h3 className="font-semibold text-[#333333] text-sm sm:text-base leading-tight group-hover:text-[#6B8E23] transition-colors duration-300">
            {category.name}
          </h3>
          <p className="text-[#696969] font-medium text-xs sm:text-sm">{category.productCount}</p>
          <div className="flex justify-center pt-1 sm:pt-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white group-hover:bg-[#6B8E23] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
              <svg
                className="w-2 h-2 sm:w-3 sm:h-3 text-[#696969] group-hover:text-white transition-colors duration-300 transform group-hover:translate-x-0.5 sm:group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Categories;