// app/components/Categories.tsx
import React from "react";
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
  columns?: number;
}

const Categories: React.FC<CategoriesProps> = ({
  title = "Shop by category",
  subtitle = "Explore our carefully curated selection of premium food categories",
  categories,
  columns = 6,
}) => {
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
    // {
    //   id: 6,
    //   name: "Fresh Fruits",
    //   productCount: "22+ Product",
    //   icon: "🍎",
    //   link: "/products?category=fruits",
    //   gradient: "bg-gradient-to-br from-white to-gray-50",
    // },
  ];

  const displayCategories = categories || defaultCategories;
  const gridClass = `grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-${columns} gap-4 lg:gap-6`;

  return (
    <section className="py-16 lg:py-20 ">
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

        {/* Categories Grid */}
        <div className={gridClass}>
          {displayCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* View All Categories CTA */}
        <div className="text-center mt-12 lg:mt-16">
          <Link
            to="/categories"
            className="inline-flex items-center justify-center bg-[#6B8E23] text-white font-semibold text-base px-8 py-4 rounded-lg transition-all duration-300 hover:bg-[#5A7A1A] focus:outline-none focus:ring-2 focus:ring-[#6B8E23] focus:ring-opacity-50"
          >
            ALL CATEGORIES
            <svg
              className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

const CategoryCard: React.FC<{ category: Category }> = ({ category }) => {
  return (
    <Link
      to={category.link}
      className="group block text-center p-6 rounded-xl bg-[#F5F5DC] border border-[#E5E5E5] hover:border-[#6B8E23] shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6B8E23] focus:ring-opacity-50"
      aria-label={`Browse ${category.name} category with ${category.productCount}`}
    >
      <div className="relative mb-6">
        <div
          className={`w-20 h-20 mx-auto rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-sm ${
            category.gradient || "bg-white"
          }`}
        >
          <span
            className="text-3xl transform transition-transform duration-300 group-hover:scale-105"
            role="img"
            aria-label={category.name}
          >
            {category.icon}
          </span>
        </div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-[#6B8E23] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-[#333333] text-base leading-tight group-hover:text-[#6B8E23] transition-colors duration-300">
          {category.name}
        </h3>
        <p className="text-[#696969] font-medium text-sm">{category.productCount}</p>
        <div className="flex justify-center pt-2">
          <div className="w-8 h-8 rounded-full bg-[#F5F5DC] group-hover:bg-[#6B8E23] flex items-center justify-center transition-all duration-300 group-hover:scale-105">
            <svg
              className="w-3 h-3 text-[#696969] group-hover:text-white transition-colors duration-300 transform group-hover:translate-x-0.5"
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
  );
};

export default Categories;