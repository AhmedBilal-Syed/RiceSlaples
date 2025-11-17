// app/routes/Home.tsx
import Header from "../Components/Header";
import Carousel from "../Components/Carousel";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import ProductCard, { defaultProducts } from "../Components/ProductCard";
import DealOfTheDay, { defaultDealProducts } from "../Components/DealofTheDay";
import BelowDealSection from "../Components/BelowDealSection";
import type { Route } from "./+types/home";

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
      
      {/* Categories Section */}
      <Categories />
      
      {/* Trending Products Section */}
      <section className="py-16 bg-[#F5F5DC]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#333333] mb-4">
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
      </section>

      {/* Features Section */}
      <section className="bg-white rounded-lg p-8 mb-12 border border-[#E5E5E5]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#6B8E23] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🚚</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-[#333333]">Free delivary</h3>
            <p className="text-[#696969] text-sm">Orders from all item</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-[#6B8E23] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">↩️</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-[#333333]">Return & refund</h3>
            <p className="text-[#696969] text-sm">Money back guarantee</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-[#6B8E23] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">💬</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-[#333333]">Customer support</h3>
            <p className="text-[#696969] text-sm">Alway online live 24/7</p>
          </div>
        </div>
      </section>

      {/* Deal of the Day Section */}
      <section className="py-16 bg-[#F5F5DC]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#333333] mb-2">
                Deal of the Day
              </h2>
            </div>
            <button className="bg-[#6B8E23] hover:bg-[#5A7A1A] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 text-lg">
              ALL PRODUCTS 
            </button>
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