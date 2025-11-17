// app/components/Carousel.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description?: string;
  price?: string;
  originalPrice?: string;
  buttonText: string;
  buttonLink: string;
  badge?: string;
}

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample slides data - replace with your actual products
  const slides: CarouselSlide[] = [
    {
      id: 1,
      image: "/images/carousel/corn-grain.jpg",
      title: "Sweeter with corn dry-grain",
      subtitle: "Premium Quality",
      price: "$29.00",
      originalPrice: "$32.00",
      buttonText: "SHOP NOW",
      buttonLink: "/products?category=corn",
      badge: "Hot"
    },
    {
      id: 2,
      image: "/images/carousel/organic-rice.jpg",
      title: "A favorite grocery's",
      subtitle: "Organic Selection",
      description: "It's grocery is always fresh!",
      buttonText: "SHOP NOW",
      buttonLink: "/products?category=rice",
      badge: "New"
    },
    {
      id: 3,
      image: "/images/carousel/fresh-staples.jpg",
      title: "The organically grocery store",
      subtitle: "Fresh & Natural",
      description: "Best quality staples for your kitchen",
      buttonText: "DISCOVER",
      buttonLink: "/products?category=staples",
      badge: "Sale"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after manual interaction
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-gradient-to-r from-green-50 to-yellow-50">
      {/* Carousel Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="container mx-auto h-full flex items-center">
              {/* Content Section */}
              <div className="w-1/2 pl-8 z-10">
                {/* Badge */}
                {slide.badge && (
                  <span className="inline-block bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
                    {slide.badge}
                  </span>
                )}
                
                {/* Title & Subtitle */}
                <h1 className="text-5xl font-bold text-gray-800 mb-4 leading-tight">
                  {slide.title}
                </h1>
                
                {slide.subtitle && (
                  <p className="text-xl text-green-700 mb-2 font-semibold">
                    {slide.subtitle}
                  </p>
                )}
                
                {slide.description && (
                  <p className="text-lg text-gray-600 mb-6">
                    {slide.description}
                  </p>
                )}

                {/* Pricing */}
                {(slide.price || slide.originalPrice) && (
                  <div className="flex items-center space-x-3 mb-6">
                    {slide.price && (
                      <span className="text-3xl font-bold text-green-700">
                        {slide.price}
                      </span>
                    )}
                    {slide.originalPrice && (
                      <span className="text-xl text-gray-500 line-through">
                        {slide.originalPrice}
                      </span>
                    )}
                  </div>
                )}

                {/* CTA Button */}
                <Link
                  to={slide.buttonLink}
                  className="inline-flex items-center bg-green-700 hover:bg-green-800 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {slide.buttonText}
                  <svg 
                    className="ml-2 w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </Link>

                {/* Discount Code - Only show on first slide */}
                {index === 0 && (
                  <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded">
                    <p className="text-sm text-gray-700">
                      <span className="font-bold">Instant discount code 20% off</span>
                      <span className="bg-white px-2 py-1 rounded ml-2 font-mono">VEG3Y5</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Image Section */}
              <div className="w-1/2 flex justify-center items-center">
                <div className="relative">
                  {/* Placeholder for product image */}
                  <div className="w-96 h-96 bg-gradient-to-br from-green-200 to-yellow-200 rounded-full flex items-center justify-center shadow-2xl">
                    <span className="text-gray-500 text-lg">Product Image</span>
                  </div>
                  
                  {/* Floating elements like in the reference */}
                  <div className="absolute -top-4 -right-4 bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
                    <span className="text-green-700 font-bold text-sm">Fresh</span>
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xs">100% Organic</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-green-700 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-20"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-green-700 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-20"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-green-700 w-8" 
                : "bg-white/70 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 z-10">
        <div 
          className="h-full bg-green-600 transition-all duration-5000 ease-linear"
          style={{ 
            width: isAutoPlaying ? '100%' : '0%',
            animation: isAutoPlaying ? 'progress 5s linear' : 'none'
          }}
        />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
    </div>
  );
};

export default Carousel;