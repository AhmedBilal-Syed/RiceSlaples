import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const MiniOrganicDualBanner = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "opacity-100",
              "translate-y-0",
              "scale-100"
            );
            entry.target.classList.remove(
              "opacity-0",
              "translate-y-10",
              "scale-95"
            );
          }
        });
      },
      { threshold: 0.1 }
    );

    if (wrapperRef.current) {
      const elements = wrapperRef.current.querySelectorAll(".animate-mini");
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 p-4 mt-24"
    >
      {/* --------------------------------- */}
      {/* CARD 1 – Green Gradient Like Main Banner */}
      {/* --------------------------------- */}

      <div className="animate-mini opacity-0 translate-y-10 scale-95 transition-all duration-700 w-2xl">
        <div className="rounded-xl bg-gradient-to-r from-[#89ad41] to-[#7a9d38] shadow-xl overflow-hidden p-8 min-h-[260px] flex flex-col md:flex-row items-center justify-between">
          
          {/* Left - Text */}
          <div className="flex flex-col mb-6 md:mb-0">
            <h2 className="text-3xl font-black text-white leading-tight">
              Healthy & Fresh
            </h2>
            <p className="text-white/90 text-md font-medium mt-1">
              Nature’s best delivered
            </p>
            <Link
              to="/products"
className="mt-4 inline-block bg-black text-white text-xl font-semibold px-8 py-3 rounded-full 
           hover:bg-gray-900 active:scale-[0.98] transition-all duration-300 shadow-lg"
            >
              Explore
            </Link>
          </div>

          {/* Right - Small Image */}
          <div className="w-40 h-40 rounded-full overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="rice.png"
              className="w-full h-full object-cover"
              alt="Organic"
            />
          </div>
        </div>
      </div>

      {/* --------------------------------- */}
      {/* CARD 2 – Orange Background bg-[#cf5923] */}
      {/* --------------------------------- */}

      <div className="animate-mini opacity-0 translate-y-10 scale-95 transition-all duration-700 delay-300 w-2xl">
        <div className="rounded-3xl bg-[#cf5923] shadow-xl overflow-hidden p-8 min-h-[260px] flex flex-col md:flex-row items-center justify-between">
          
          {/* Left - Text */}
          <div className="flex flex-col mb-6 md:mb-0">
            <h2 className="text-3xl font-black text-white leading-tight">
              Spices & More
            </h2>
            <p className="text-white/90 text-md font-medium mt-1">
              Perfect taste every time
            </p>
            <Link
              to="/products"
className="mt-4 inline-block bg-black text-white text-xl font-semibold px-8 py-3 rounded-full 
           hover:bg-gray-900 active:scale-[0.98] transition-all duration-300 shadow-lg"
            >
              Shop
            </Link>
          </div>

          {/* Right - Small Image */}
          <div className="w-40 h-40 rounded-full overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="/rice2.png"
              className="w-full h-full object-cover"
              alt="Spices"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniOrganicDualBanner;
