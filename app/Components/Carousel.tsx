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

  // Sample slides data - matching the Vegist design
  const slides: CarouselSlide[] = [
    {
      id: 1,
      image: "/rice.png",
      title: "Sweeter with corn dry-grain",
      subtitle: "Only $29.00 ~ $32.00",
      buttonText: "SHOP NOW",
      buttonLink: "/products?category=corn",
      badge: "Hot"
    },
    {
      id: 2,
      image: "/grain.png",
      title: "A favorite grocery's",
      subtitle: "It's grocery is always fresh!",
      buttonText: "SHOP NOW",
      buttonLink: "/products?category=fresh",
    },
    // {
    //   id: 3,
    //   image: "/images/carousel/organic-store.jpg",
    //   title: "The organically grocery store",
    //   subtitle: "Premium quality products",
    //   buttonText: "DISCOVER",
    //   buttonLink: "/products?category=organic",
    // }
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
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden bg-[#F5F5DC]">
      {/* Carousel Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="container mx-auto h-full flex flex-col md:flex-row items-center px-4 sm:px-6">
              {/* Content Section */}
              <div className="w-full md:w-1/2 lg:w-1/2 pt-8 md:pt-0 md:pl-4 lg:pl-8 z-10 order-2 md:order-1 text-center md:text-left">
                {/* Badge */}
                {slide.badge && (
                  <span className="inline-block bg-[#DC143C] text-white px-3 py-1 rounded text-xs font-bold mb-3 md:mb-4">
                    {slide.badge}
                  </span>
                )}
                
                {/* Title & Subtitle */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-3 md:mb-4 leading-tight">
                  {slide.title}
                </h1>
                
                {slide.subtitle && (
                  <p className="text-base sm:text-lg md:text-xl text-[#6B8E23] mb-3 md:mb-4 font-semibold">
                    {slide.subtitle}
                  </p>
                )}
                
                {slide.description && (
                  <p className="text-sm sm:text-base text-[#696969] mb-4 md:mb-6 hidden sm:block">
                    {slide.description}
                  </p>
                )}

                {/* Pricing */}
                {(slide.price || slide.originalPrice) && (
                  <div className="flex items-center justify-center md:justify-start space-x-2 md:space-x-3 mb-4 md:mb-6">
                    {slide.price && (
                      <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#DC143C]">
                        {slide.price}
                      </span>
                    )}
                    {slide.originalPrice && (
                      <span className="text-base sm:text-lg md:text-xl text-[#696969] line-through">
                        {slide.originalPrice}
                      </span>
                    )}
                  </div>
                )}

                {/* CTA Button */}
                <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
                  <Link
                    to={slide.buttonLink}
                    className="inline-flex items-center bg-[#6B8E23] hover:bg-[#5A7A1A] text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base"
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
                    <div className="mt-2 md:mt-0 p-3 bg-yellow-100 border-l-4 border-yellow-500 rounded max-w-xs md:max-w-sm">
                      <p className="text-xs sm:text-sm text-gray-700">
                        <span className="font-bold">Instant discount code 20% off</span>
                        <span className="bg-white px-2 py-1 rounded ml-2 font-mono text-xs">VEG3Y5</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Image Section */}
              <div className="w-full md:w-1/2 lg:w-1/2 flex justify-center items-center order-1 md:order-2 mb-4 md:mb-0">
                <div className="relative">
                  {/* Product Image */}
                  <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full flex items-center justify-center shadow-2xl overflow-hidden bg-white border-4 border-white">
                    <img 
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback if image fails to load
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    {/* Fallback placeholder */}
                    <div 
                      className="w-full h-full bg-gradient-to-br from-[#6B8E23]/20 to-[#F5F5DC] rounded-full flex items-center justify-center hidden"
                      style={{ display: 'none' }}
                    >
                      <span className="text-[#696969] text-sm sm:text-lg">Product Image</span>
                    </div>
                  </div>
                  
                  {/* Floating elements - hidden on mobile, shown on tablet+ */}
                  <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-white rounded-full w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center shadow-lg hidden sm:flex">
                    <span className="text-[#6B8E23] font-bold text-xs sm:text-sm">Fresh</span>
                  </div>
                  <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-[#6B8E23] rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center shadow-lg hidden sm:flex">
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
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#6B8E23] w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-20"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#6B8E23] w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-20"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide 
                ? "bg-[#6B8E23] w-6 sm:w-8 h-2 sm:h-3 rounded-full" 
                : "bg-white/70 hover:bg-white w-2 h-2 sm:w-3 sm:h-3 rounded-full"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200/50 z-10">
        <div 
          className="h-full bg-[#6B8E23] transition-all duration-5000 ease-linear"
          style={{ 
            width: isAutoPlaying ? '100%' : '0%',
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