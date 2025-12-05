import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const SimpleOrganicBanner = () => {
  const bannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-x-0', 'scale-100');
            entry.target.classList.remove('opacity-0', '-translate-x-12', 'scale-95', 'translate-x-12');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (bannerRef.current) {
      const elements = bannerRef.current.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={bannerRef} className="flex items-center justify-center p-4 mt-16 mb-16">
      <div className="w-full max-w-7xl bg-gradient-to-r from-[#89ad41] to-[#7a9d38] rounded-3xl shadow-2xl overflow-hidden">
        {/* Main flex container */}
        <div className="flex flex-col lg:flex-row items-center justify-between p-6 md:p-10 lg:p-12 min-h-[350px] md:min-h-[400px]">
          
          {/* Text Section */}
          <div className="lg:w-2/5 flex flex-col justify-center mb-8 lg:mb-0 animate-on-scroll opacity-0 -translate-x-12 scale-95 transition-all duration-700">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              The organically<br />
              grocery store !
            </h1>
            <p className="text-white/90 text-lg font-medium animate-pulse">
              Fresh from farm to table
            </p>
          </div>
          
          {/* Image Section - FIXED */}
          <div className="lg:w-1/3 relative flex items-center justify-center my-8 lg:my-0 min-h-[250px] md:min-h-[300px]">
            
            {/* Main image */}
            <div className="relative z-20 animate-on-scroll opacity-0 scale-95 transition-all duration-700 delay-300">
              <div className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl relative group">
                <img 
                  src="/rice2.png" 
                  alt="Organic Rice" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
            
         
            
            {/* Floating animation container */}
            <div className="absolute inset-0 z-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%]">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 animate-float" style={{animation: 'float 6s ease-in-out infinite'}}></div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white/30 blur-md animate-pulse"></div>
            <div className="absolute bottom-6 right-6 w-16 h-16 rounded-full bg-yellow-300/30 blur-md animate-pulse delay-1000"></div>
            
          </div>
          
          {/* Button Section */}
          <div className="lg:w-1/4 flex justify-center lg:justify-end items-center mt-8 lg:mt-0 animate-on-scroll opacity-0 translate-x-12 scale-95 transition-all duration-700 delay-500">
            <Link 
              to="/products" 
              className="group relative bg-slate-900 hover:bg-black text-white font-bold py-4 px-10 md:py-5 md:px-14 rounded-full text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1 active:translate-y-0 overflow-hidden"
            >
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              <span className="flex items-center gap-3 relative z-10">
                Shop Now
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
          
        </div>
        
        {/* Animated bottom border */}
        <div className="h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]"></div>
      </div>

      {/* CSS for floating animation */}
      
    </div>
  );
};

export default SimpleOrganicBanner;