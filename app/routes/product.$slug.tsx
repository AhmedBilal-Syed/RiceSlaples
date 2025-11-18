// app/routes/products.$slug.tsx
import React from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ProductCard, { defaultProducts } from "../Components/ProductCard";
import type { Route } from "./+types/home";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `${(params as { slug: string }).slug} - Vegist` },
    { name: "description", content: "Premium quality product from Vegist" },
  ];
}

export default function ProductDetail() {
  const { slug } = useParams();
  const product = defaultProducts.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/" className="text-green-600 hover:text-green-700">
            Return to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ProductDetailContent product={product} />
      <Footer />
    </div>
  );
}

// Product Detail Component
interface ProductDetailProps {
  product: any;
}

const ProductDetailContent: React.FC<ProductDetailProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("1kg");
  const [activeTab, setActiveTab] = useState("description");

  const sizes = ["500g", "1kg", "2kg", "5kg"];

  // Dummy reviews data
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      date: "2024-01-15",
      comment: "Excellent quality! The beans were fresh and cooked perfectly. Will definitely buy again!",
      verified: true
    },
    {
      id: 2,
      name: "Sarah Wilson",
      rating: 4,
      date: "2024-01-10",
      comment: "Good product, fast delivery. The packaging was secure and the quality is as described.",
      verified: true
    },
    {
      id: 3,
      name: "Mike Johnson",
      rating: 5,
      date: "2024-01-05",
      comment: "Amazing taste and quality. My family loved it! Highly recommended for healthy cooking.",
      verified: false
    },
    {
      id: 4,
      name: "Emily Brown",
      rating: 4,
      date: "2024-01-02",
      comment: "Very satisfied with the purchase. The product arrived fresh and well-packaged.",
      verified: true
    }
  ];

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      product: product.name,
      quantity,
      size: selectedSize,
      price: product.price
    });
  };

  const handleBuyNow = () => {
    console.log("Buy now:", {
      product: product.name,
      quantity,
      size: selectedSize,
      price: product.price
    });
  };

    function handleToggleFavorite(productId: number): void {
        throw new Error("Function not implemented.");
    }

  return (
    <section className="py-8 lg:py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6 lg:mb-8">
          <nav className="flex text-sm text-[#696969]">
            <Link to="/" className="hover:text-[#6B8E23]">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-[#6B8E23]">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-[#333333] capitalize">{product.name}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-lg p-4 lg:p-6 border border-[#E5E5E5] shadow-sm">
              <div className="aspect-square flex items-center justify-center">
                <span className="text-8xl lg:text-9xl">{product.images[selectedImage]}</span>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-lg border-2 flex items-center justify-center transition-all ${
                    selectedImage === index 
                      ? "border-[#6B8E23] shadow-md" 
                      : "border-[#E5E5E5] hover:border-[#6B8E23]"
                  }`}
                >
                  <span className="text-2xl lg:text-3xl">{image}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6 lg:space-y-8">
            {/* Product Name */}
            <div>
              <h1 className="text-2xl lg:text-4xl font-bold text-[#333333] mb-2">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex text-yellow-500 text-sm lg:text-base">
                  {"★".repeat(Math.floor(product.rating || 0))}
                  {"☆".repeat(5 - Math.floor(product.rating || 0))}
                </div>
                <span className="text-[#696969] text-sm lg:text-base">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2 mb-4">
                <div className={`w-2 h-2 rounded-full ${
                  product.inStock ? "bg-green-500" : "bg-red-500"
                }`} />
                <span className={`text-sm font-medium ${
                  product.inStock ? "text-green-600" : "text-red-600"
                }`}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Price and Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl lg:text-3xl font-bold text-[#DC143C]">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg lg:text-xl text-[#696969] line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>
              
              {/* Product Badge */}
              {product.badge && (
                <span className={`px-3 py-1 text-xs lg:text-sm font-bold text-white rounded ${
                  product.badge === "Hot" || product.badge === "Sale"
                    ? "bg-[#DC143C]"
                    : "bg-[#6B8E23]"
                }`}>
                  {product.badge}
                </span>
              )}
            </div>

            {/* Short Description */}
            <div className="border-t border-b border-[#E5E5E5] py-4">
              <p className="text-[#696969] text-sm lg:text-base leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#333333] text-lg">Select Size:</h3>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 lg:px-6 lg:py-3 border-2 rounded-lg text-sm lg:text-base font-medium transition-all ${
                      selectedSize === size
                        ? "border-[#6B8E23] bg-[#6B8E23] text-white"
                        : "border-[#E5E5E5] text-[#333333] hover:border-[#6B8E23]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#333333] text-lg">Quantity:</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                  className="w-10 h-10 lg:w-12 lg:h-12 border border-[#E5E5E5] rounded-lg flex items-center justify-center text-[#333333] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="w-12 lg:w-16 text-center text-lg lg:text-xl font-semibold text-[#333333]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="w-10 h-10 lg:w-12 lg:h-12 border border-[#E5E5E5] rounded-lg flex items-center justify-center text-[#333333] hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-[#6B8E23] hover:bg-[#5A7A1A] text-white font-bold py-3 lg:py-4 px-6 rounded-lg transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm lg:text-base"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex-1 bg-[#DC143C] hover:bg-[#C1121F] text-white font-bold py-3 lg:py-4 px-6 rounded-lg transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm lg:text-base"
              >
                Buy Now
              </button>
            </div>

            {/* Additional Info */}
            <div className="border-t border-[#E5E5E5] pt-6 space-y-4">
              <div className="flex items-center space-x-2 text-sm text-[#696969]">
                <span className="font-semibold text-[#333333]">Category:</span>
                <span>{product.category}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-[#696969]">
                <span className="font-semibold text-[#333333]">Weight:</span>
                <span>{product.weight}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-[#696969]">
                <span className="font-semibold text-[#333333]">Ingredients:</span>
                <span>{product.ingredients}</span>
              </div>
            </div>
          </div>
        </div>

        

        {/* Description and Reviews Tabs */}
        <div className="mt-12 lg:mt-16 bg-white rounded-lg border border-[#E5E5E5]">
          {/* Tab Headers */}
          <div className="border-b border-[#E5E5E5]">
            <div className="flex">
              <button
                onClick={() => setActiveTab("description")}
                className={`flex-1 py-4 px-6 text-center font-semibold border-b-2 transition-colors ${
                  activeTab === "description"
                    ? "border-[#6B8E23] text-[#6B8E23]"
                    : "border-transparent text-[#696969] hover:text-[#333333]"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`flex-1 py-4 px-6 text-center font-semibold border-b-2 transition-colors ${
                  activeTab === "reviews"
                    ? "border-[#6B8E23] text-[#6B8E23]"
                    : "border-transparent text-[#696969] hover:text-[#333333]"
                }`}
              >
                Reviews ({reviews.length})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 lg:p-8">
            {activeTab === "description" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#333333] mb-4">Product Description</h3>
                <p className="text-[#696969] leading-relaxed">
                  {product.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-[#333333]">Key Features:</h4>
                    <ul className="text-[#696969] list-disc list-inside space-y-1">
                      <li>100% Natural and Organic</li>
                      <li>Rich in essential nutrients</li>
                      <li>Perfect for daily cooking</li>
                      <li>Premium quality guarantee</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-[#333333]">Storage Instructions:</h4>
                    <ul className="text-[#696969] list-disc list-inside space-y-1">
                      <li>Store in a cool, dry place</li>
                      <li>Keep away from direct sunlight</li>
                      <li>Use within 6 months of opening</li>
                      <li>Reseal package after use</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {/* Reviews Summary */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#333333]">{product.rating}</div>
                      <div className="flex text-yellow-500 text-sm">
                        {"★".repeat(Math.floor(product.rating || 0))}
                        {"☆".repeat(5 - Math.floor(product.rating || 0))}
                      </div>
                      <div className="text-[#696969] text-sm mt-1">{product.reviewCount} reviews</div>
                    </div>
                  </div>
                  <button className="bg-[#6B8E23] hover:bg-[#5A7A1A] text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                    Write a Review
                  </button>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-[#E5E5E5] pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-[#333333]">{review.name}</span>
                            {review.verified && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Verified</span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex text-yellow-500 text-sm">
                              {"★".repeat(review.rating)}
                              {"☆".repeat(5 - review.rating)}
                            </div>
                            <span className="text-[#696969] text-sm">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[#696969] leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>

                {/* Load More Reviews */}
                <div className="text-center pt-4">
                  <button className="text-[#6B8E23] hover:text-[#5A7A1A] font-semibold transition-colors">
                    Load More Reviews
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>


       <section className="py-16 ">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#333333] mb-4">
                    Related Products
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
    </section>

    
  );
};