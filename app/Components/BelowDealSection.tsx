// app/components/BelowDealSection.tsx
import React from "react";
import { Link } from "react-router-dom";

const BelowDealSection = () => {
  const brands = [
    { id: 1, name: "kellogg", logo: "🌾" },
    { id: 2, name: "softlim", logo: "🍞" },
    { id: 3, name: "nestlo", logo: "☕" },
    { id: 4, name: "hallion", logo: "🥛" },
    { id: 5, name: "orgeniy", logo: "🌿" }
  ];

  const features = [
    {
      id: 1,
      title: "Spices that make everything",
      subtitle: "Delicious inside every pack",
      description: "Lorem ipsum dolor sit amet, consectetuer adipis",
      emoji: "🌶️"
    },
    {
      id: 2,
      title: "Eat dried fruits and be",
      subtitle: "Healthy",
      description: "Lorem ipsum dolor sit amet, consectetuer adipis",
      emoji: "🍓"
    },
    {
      id: 3,
      title: "The grocery store that",
      subtitle: "Better",
      description: "Lorem ipsum dolor sit amet, consectetuer adipis",
      emoji: "🛒"
    }
  ];

  return (
    <div className="bg-white">
      {/* Brand Showcase */}
      <section className="border-t border-b border-[#E5E5E5] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Brands */}
            <div className="flex items-center justify-center flex-wrap gap-6 lg:gap-10">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className="flex flex-col items-center text-[#333333] hover:text-[#6B8E23] transition-colors"
                >
                  <span className="text-3xl mb-1">{brand.logo}</span>
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Black Friday Banner */}
            <div className="bg-[#333333] text-white rounded-lg p-4 text-center max-w-sm">
              <h3 className="text-lg font-bold mb-1">
                Celebrate black friday with a sweet indulgence
              </h3>
              <p className="text-[#E5E5E5] text-xs mb-3">
                % agit grocery store don't miss!
              </p>
              <div className="bg-[#DC143C] text-white px-3 py-1 rounded inline-block font-bold text-xs">
                USE CODE: FW20
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#333333] mb-2">
              Positive for story
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="text-center p-6 border border-[#E5E5E5] rounded-lg bg-white hover:shadow-sm transition-all"
              >
                <div className="text-4xl mb-3">{feature.emoji}</div>
                <h3 className="text-lg font-bold text-[#333333] mb-1">
                  {feature.title}
                </h3>
                <h4 className="text-[#6B8E23] font-bold text-lg mb-3">
                  {feature.subtitle}
                </h4>
                <p className="text-[#696969] text-sm mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <Link
                  to="#"
                  className="inline-flex items-center text-[#6B8E23] font-bold hover:text-[#5A7A1A] transition-colors text-sm"
                >
                  READ MORE
                  <svg
                    className="w-3 h-3 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BelowDealSection;