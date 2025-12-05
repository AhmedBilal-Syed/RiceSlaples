// app/routes/Home.tsx
import Header from "../Components/Header";
import Carousel from "../Components/Carousel";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import ProductCard, { defaultProducts } from "../Components/ProductCard";
import DealOfTheDay, { defaultDealProducts } from "../Components/DealofTheDay";
import BelowDealSection from "../Components/BelowDealSection";
import type { Route } from "./+types/home";
import { Link } from "react-router-dom";
import OrganicGroceryBanner from "~/Components/OrganicGroceryBanner";
import MiniOrganicDualBanner from "~/Components/MiniOrganicDualBanner";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Vegist - Premium Rice & Staples" },
    { name: "description", content: "Welcome to Vegist - Your trusted source for premium rice, grains, and kitchen staples." },
  ];
}

export default function Home() {
  const handleAddToCart = (product: any) => {
    console.log("Add to cart:", product);
  };

  const handleToggleFavorite = (productId: number) => {
    console.log("Toggle favorite:", productId);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Carousel />
      <MiniOrganicDualBanner/>
      
      {/* Categories Section */}
      <Categories />
      
      {/* Trending Products Section */}
      <section className="py-16 bg-[#fcf6ed]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#222222] mb-4">
              Trending products
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {defaultProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12 lg:mt-16">
         <Link
  to="/products"
  className="inline-flex items-center justify-center bg-[#b91d08] text-white font-semibold text-base px-10 py-3 rounded-4xl transition-all duration-300  ck focus:outline-none focus:ring-2  focus:ring-opacity-50"
>
  ALL Products
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
      </section>

      {/* Features Section */}
     {/* <section className="bg-white rounded-xl p-8 mb-12 shadow-lg">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

    <div className="text-center group">
      <div className="w-20 h-20 bg-gradient-to-br from-[#df3400] to-[#ff6b3d] rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
          <span className="text-white text-3xl">🚚</span>
        </div>
      </div>
      <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-[#df3400] transition-colors duration-300">
        Free Delivery
      </h3>
      <p className="text-gray-500 text-sm">Orders from all items</p>
    </div>


    <div className="text-center group">
      <div className="w-20 h-20 bg-gradient-to-br from-[#df3400] to-[#ff6b3d] rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
          <span className="text-white text-3xl">🔄</span>
        </div>
      </div>
      <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-[#df3400] transition-colors duration-300">
        Return & Refund
      </h3>
      <p className="text-gray-500 text-sm">Money back guarantee</p>
    </div>

    
    <div className="text-center group">
      <div className="w-20 h-20 bg-gradient-to-br from-[#df3400] to-[#ff6b3d] rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
          <span className="text-white text-3xl">💬</span>
        </div>
      </div>
      <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-[#df3400] transition-colors duration-300">
        Customer Support
      </h3>
      <p className="text-gray-500 text-sm">Always online 24/7</p>
    </div>
  </div>
</section> */}
<OrganicGroceryBanner/>
      {/* Deal of the Day Section */}
      <section className="py-16 bg-[#fcf6ed]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#222222] mb-2">
                Deal of the Day
              </h2>
            </div>
             <Link
  to="/products"
  className="inline-flex items-center justify-center bg-[#b91d08] text-white font-semibold text-base px-10 py-3 rounded-4xl transition-all duration-300  focus:outline-none focus:ring-2  focus:ring-opacity-50"
>
  ALL Products
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {defaultDealProducts.map((product) => (
              <DealOfTheDay 
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Below Deal Section - Brand Showcase & Features */}
      <BelowDealSection />

      <Footer />
    </div>
  );
}