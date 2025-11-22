// app/routes/products.$slug.tsx
import React from "react";
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ProductCard, { defaultProducts } from "../Components/ProductCard";
import StoreSelector from "../Components/StoreSelector";
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

// Product variant types
interface ProductVariant {
  id: string;
  type: string;
  value: string;
  priceMultiplier?: number;
  available: boolean;
}

// Weight package interface
interface WeightPackage {
  weight: string;
  price: string;
  originalPrice?: string;
  available: boolean;
}

// Brand interface
interface Brand {
  id: string;
  name: string;
  premium: boolean;
}

// Store Location interface
interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  isActive: boolean;
  distance?: string;
  timing: string;
}

const ProductDetailContent: React.FC<ProductDetailProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("5kg");
  const [activeTab, setActiveTab] = useState("description");
  const navigate = useNavigate();
  
  // State for product variants
  const [selectedGrainType, setSelectedGrainType] = useState("longGrain");
  const [selectedPolishType, setSelectedPolishType] = useState("standardPolish");
  const [selectedBrand, setSelectedBrand] = useState("premiumBasmati");
  const [customWeight, setCustomWeight] = useState("");

  // State for store pickup
  const [deliveryOption, setDeliveryOption] = useState<'home' | 'store'>('home');
  const [selectedStore, setSelectedStore] = useState<StoreLocation | null>(null);

  // Store locations data
  const storeLocations: StoreLocation[] = [
    { 
      id: "store-1", 
      name: "Vegist Main Store", 
      address: "123 Main Street, Andheri West", 
      city: "Mumbai", 
      country: "IN", 
      phone: "+91 9876543210",
      isActive: true, 
      distance: "2.5 km",
      timing: "9:00 AM - 9:00 PM"
    },
    { 
      id: "store-2", 
      name: "Vegist Downtown", 
      address: "456 Downtown Avenue, Connaught Place", 
      city: "Delhi", 
      country: "IN", 
      phone: "+91 9876543211",
      isActive: true, 
      distance: "1.8 km",
      timing: "8:00 AM - 10:00 PM"
    },
    { 
      id: "store-3", 
      name: "Vegist Premium", 
      address: "789 Luxury Road, Koramangala", 
      city: "Bangalore", 
      country: "IN", 
      phone: "+91 9876543212",
      isActive: true, 
      distance: "3.2 km",
      timing: "10:00 AM - 8:00 PM"
    },
    { 
      id: "store-4", 
      name: "Vegist Express", 
      address: "321 Quick Lane, T Nagar", 
      city: "Chennai", 
      country: "IN", 
      phone: "+91 9876543213",
      isActive: false, 
      distance: "4.1 km",
      timing: "9:00 AM - 9:00 PM"
    }
  ];

  // Product variants data
  const grainTypes: ProductVariant[] = [
    { id: "longGrain", type: "grain", value: "Long Grain", available: true },
    { id: "shortGrain", type: "grain", value: "Short Grain", available: true },
    { id: "broken", type: "grain", value: "Broken Rice", available: true, priceMultiplier: 0.7 },
    { id: "extraLong", type: "grain", value: "Extra Long Grain", available: true, priceMultiplier: 1.2 }
  ];

  const polishTypes: ProductVariant[] = [
    { id: "standardPolish", type: "polish", value: "Standard Polish", available: true },
    { id: "slightPolish", type: "polish", value: "Slight Polish", available: true },
    { id: "deepPolish", type: "polish", value: "Deep Polish", available: true, priceMultiplier: 1.1 },
    { id: "unpolished", type: "polish", value: "Unpolished (Brown)", available: true, priceMultiplier: 0.9 }
  ];

  const brands: Brand[] = [
    { id: "premiumBasmati", name: "Premium Basmati", premium: true },
    { id: "classicBasmati", name: "Classic Basmati", premium: false },
    { id: "royalBasmati", name: "Royal Basmati", premium: true },
    { id: "everydayBasmati", name: "Everyday Basmati", premium: false }
  ];

  const weightPackages: WeightPackage[] = [
    { weight: "500g", price: "₹199", originalPrice: "₹249", available: true },
    { weight: "1kg", price: "₹349", originalPrice: "₹399", available: true },
    { weight: "2kg", price: "₹649", available: true },
    { weight: "5kg", price: "₹1,499", originalPrice: "₹1,699", available: true },
    { weight: "10kg", price: "₹2,799", available: true },
    { weight: "25kg", price: "₹6,499", available: true },
    { weight: "50kg", price: "₹12,499", available: false }
  ];

  // Calculate dynamic price based on selections
  const calculatePrice = () => {
    const baseWeightPackage = weightPackages.find(wp => wp.weight === selectedSize);
    if (!baseWeightPackage) return "₹0";

    let basePrice = parseFloat(baseWeightPackage.price.replace(/[^0-9.]/g, ''));
    
    // Apply grain type multiplier
    const selectedGrain = grainTypes.find(gt => gt.id === selectedGrainType);
    if (selectedGrain?.priceMultiplier) {
      basePrice *= selectedGrain.priceMultiplier;
    }
    
    // Apply polish type multiplier
    const selectedPolish = polishTypes.find(pt => pt.id === selectedPolishType);
    if (selectedPolish?.priceMultiplier) {
      basePrice *= selectedPolish.priceMultiplier;
    }
    
    // Apply brand premium
    const selectedBrandData = brands.find(b => b.id === selectedBrand);
    if (selectedBrandData?.premium) {
      basePrice *= 1.15; // 15% premium for premium brands
    }

    return `₹${Math.round(basePrice).toLocaleString()}`;
  };

  const currentPrice = calculatePrice();

  // Check if current configuration is available
  const isConfigurationAvailable = () => {
    const selectedWeight = weightPackages.find(wp => wp.weight === selectedSize);
    const selectedGrain = grainTypes.find(gt => gt.id === selectedGrainType);
    const selectedPolish = polishTypes.find(pt => pt.id === selectedPolishType);

    return selectedWeight?.available && 
           selectedGrain?.available && 
           selectedPolish?.available;
  };

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
    const selectedGrain = grainTypes.find(gt => gt.id === selectedGrainType);
    const selectedPolish = polishTypes.find(pt => pt.id === selectedPolishType);
    const selectedBrandData = brands.find(b => b.id === selectedBrand);

    const cartItem = {
      product: product.name,
      variant: {
        grainType: selectedGrain?.value,
        polishType: selectedPolish?.value,
        brand: selectedBrandData?.name,
        weight: selectedSize
      },
      quantity,
      price: currentPrice,
      configuration: {
        grainType: selectedGrainType,
        polishType: selectedPolishType,
        brand: selectedBrand,
        weight: selectedSize
      },
      deliveryOption,
      selectedStore: deliveryOption === 'store' ? selectedStore : null
    };

    console.log("Added to cart:", cartItem);
    
    // Store in localStorage for cart persistence
    const existingCart = JSON.parse(localStorage.getItem('vegist-cart') || '[]');
    existingCart.push(cartItem);
    localStorage.setItem('vegist-cart', JSON.stringify(existingCart));

    // Show success message
    alert('Product added to cart successfully!');
  };

  // In ProductDetailContent - update handleBuyNow
const handleBuyNow = () => {
  const selectedGrain = grainTypes.find(gt => gt.id === selectedGrainType);
  const selectedPolish = polishTypes.find(pt => pt.id === selectedPolishType);
  const selectedBrandData = brands.find(b => b.id === selectedBrand);

  const orderItem = {
    id: Date.now(),
    name: product.name,
    size: selectedSize,
    brand: selectedBrandData?.name,
    price: parseFloat(currentPrice.replace(/[^0-9.]/g, '')),
    quantity: quantity,
    image: product.images[0],
    deliveryOption: deliveryOption,
    selectedStore: deliveryOption === 'store' ? selectedStore : null,
    configuration: {
      grainType: selectedGrainType,
      polishType: selectedPolishType,
      brand: selectedBrand,
      weight: selectedSize
    }
  };

  // Navigate to unified checkout with single item
  navigate('/checkout', { 
    state: { 
      items: [orderItem],
      source: 'buyNow'
    } 
  });
};

  const handleReserveAndPayAtStore = () => {
    if (!selectedStore) {
      alert('Please select a store for pickup');
      return;
    }

    const selectedGrain = grainTypes.find(gt => gt.id === selectedGrainType);
    const selectedPolish = polishTypes.find(pt => pt.id === selectedPolishType);
    const selectedBrandData = brands.find(b => b.id === selectedBrand);

    const reservationData = {
      product: product.name,
      variant: {
        grainType: selectedGrain?.value,
        polishType: selectedPolish?.value,
        brand: selectedBrandData?.name,
        weight: selectedSize
      },
      quantity,
      price: currentPrice,
      configuration: {
        grainType: selectedGrainType,
        polishType: selectedPolishType,
        brand: selectedBrand,
        weight: selectedSize
      },
      selectedStore,
      reservationId: `RES${Date.now()}`,
      reservationDate: new Date().toISOString(),
      status: 'reserved'
    };

    console.log("Reserve for store pickup:", reservationData);
    
    // Store reservation in localStorage
    const existingReservations = JSON.parse(localStorage.getItem('vegist-reservations') || '[]');
    existingReservations.push(reservationData);
    localStorage.setItem('vegist-reservations', JSON.stringify(existingReservations));

    // Navigate to reservation confirmation page
    navigate('/reservation-confirmation', { state: { reservation: reservationData } });
  };

  const handleCustomWeight = () => {
    if (customWeight && !isNaN(parseFloat(customWeight)) && parseFloat(customWeight) > 0) {
      const weight = parseFloat(customWeight);
      let calculatedPrice = weight * 280; // ₹280 per kg as base price
      
      // Apply multipliers for variants
      const selectedGrain = grainTypes.find(gt => gt.id === selectedGrainType);
      const selectedPolish = polishTypes.find(pt => pt.id === selectedPolishType);
      const selectedBrandData = brands.find(b => b.id === selectedBrand);

      if (selectedGrain?.priceMultiplier) calculatedPrice *= selectedGrain.priceMultiplier;
      if (selectedPolish?.priceMultiplier) calculatedPrice *= selectedPolish.priceMultiplier;
      if (selectedBrandData?.premium) calculatedPrice *= 1.15;

      return `₹${Math.round(calculatedPrice).toLocaleString()}`;
    }
    return "Enter valid weight";
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
                  isConfigurationAvailable() ? "bg-green-500" : "bg-red-500"
                }`} />
                <span className={`text-sm font-medium ${
                  isConfigurationAvailable() ? "text-green-600" : "text-red-600"
                }`}>
                  {isConfigurationAvailable() ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Price and Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl lg:text-3xl font-bold text-[#DC143C]">
                  {currentPrice}
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

            {/* Delivery Options */}
            <div className="bg-gray-50 rounded-lg p-6 border border-[#E5E5E5]">
              <h3 className="font-semibold text-[#333333] text-lg mb-4">🛍️ Delivery Options</h3>
              
              {/* Delivery Option Toggle */}
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setDeliveryOption('home')}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                    deliveryOption === 'home' 
                      ? 'bg-[#6B8E23] text-white shadow-md' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-[#6B8E23]'
                  }`}
                >
                  🚚 Home Delivery
                </button>
                <button
                  onClick={() => setDeliveryOption('store')}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                    deliveryOption === 'store' 
                      ? 'bg-[#6B8E23] text-white shadow-md' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-[#6B8E23]'
                  }`}
                >
                  🏪 Pickup from Store
                </button>
              </div>

              {/* Store Selector for Pickup */}
              {deliveryOption === 'store' && (
                <StoreSelector 
                  stores={storeLocations.filter(store => store.isActive)}
                  selectedStore={selectedStore}
                  onStoreSelect={setSelectedStore}
                />
              )}

              {/* Delivery Info */}
              {deliveryOption === 'home' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                  <p className="text-green-800 text-sm">
                    🚚 Free delivery within 3-5 business days. Express delivery available.
                  </p>
                </div>
              )}
            </div>

            {/* Brand Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#333333] text-lg">Select Brand:</h3>
              <div className="flex flex-wrap gap-3">
                {brands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => setSelectedBrand(brand.id)}
                    className={`px-4 py-2 lg:px-6 lg:py-3 border-2 rounded-lg text-sm lg:text-base font-medium transition-all ${
                      selectedBrand === brand.id
                        ? "border-[#6B8E23] bg-[#6B8E23] text-white"
                        : "border-[#E5E5E5] text-[#333333] hover:border-[#6B8E23]"
                    } ${brand.premium ? 'border-yellow-400' : ''}`}
                  >
                    {brand.name}
                    {brand.premium && <span className="ml-1 text-yellow-400">★</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Grain Type Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#333333] text-lg">Grain Type:</h3>
              <div className="flex flex-wrap gap-3">
                {grainTypes.map((grain) => (
                  <button
                    key={grain.id}
                    onClick={() => setSelectedGrainType(grain.id)}
                    disabled={!grain.available}
                    className={`px-4 py-2 lg:px-6 lg:py-3 border-2 rounded-lg text-sm lg:text-base font-medium transition-all ${
                      selectedGrainType === grain.id
                        ? "border-[#6B8E23] bg-[#6B8E23] text-white"
                        : "border-[#E5E5E5] text-[#333333] hover:border-[#6B8E23]"
                    } ${!grain.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {grain.value}
                    {grain.priceMultiplier && (
                      <span className="text-xs ml-1">
                        {grain.priceMultiplier > 1 ? '(+)' : '(-)'}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Polish Type Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#333333] text-lg">Polish Type:</h3>
              <div className="flex flex-wrap gap-3">
                {polishTypes.map((polish) => (
                  <button
                    key={polish.id}
                    onClick={() => setSelectedPolishType(polish.id)}
                    disabled={!polish.available}
                    className={`px-4 py-2 lg:px-6 lg:py-3 border-2 rounded-lg text-sm lg:text-base font-medium transition-all ${
                      selectedPolishType === polish.id
                        ? "border-[#6B8E23] bg-[#6B8E23] text-white"
                        : "border-[#E5E5E5] text-[#333333] hover:border-[#6B8E23]"
                    } ${!polish.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {polish.value}
                    {polish.priceMultiplier && (
                      <span className="text-xs ml-1">
                        {polish.priceMultiplier > 1 ? '(+)' : '(-)'}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Weight Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#333333] text-lg">Select Weight Package:</h3>
              <div className="flex flex-wrap gap-3">
                {weightPackages.map((weightPkg) => (
                  <button
                    key={weightPkg.weight}
                    onClick={() => setSelectedSize(weightPkg.weight)}
                    disabled={!weightPkg.available}
                    className={`px-4 py-2 lg:px-6 lg:py-3 border-2 rounded-lg text-sm lg:text-base font-medium transition-all ${
                      selectedSize === weightPkg.weight
                        ? "border-[#6B8E23] bg-[#6B8E23] text-white"
                        : "border-[#E5E5E5] text-[#333333] hover:border-[#6B8E23]"
                    } ${!weightPkg.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {weightPkg.weight}
                    {weightPkg.originalPrice && (
                      <span className="block text-xs line-through text-gray-500">
                        {weightPkg.originalPrice}
                      </span>
                    )}
                    <span className="block text-xs font-bold">
                      {weightPkg.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Weight Option */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#333333] text-lg">Custom Weight (in kg):</h3>
              <div className="flex gap-3 items-center">
                <input
                  type="number"
                  value={customWeight}
                  onChange={(e) => setCustomWeight(e.target.value)}
                  placeholder="Enter weight in kg"
                  className="flex-1 px-4 py-2 border-2 border-[#E5E5E5] rounded-lg text-sm lg:text-base focus:border-[#6B8E23] focus:outline-none"
                  min="0.1"
                  step="0.1"
                />
                <button
                  onClick={() => {
                    if (customWeight && !isNaN(parseFloat(customWeight))) {
                      setSelectedSize(`custom-${customWeight}kg`);
                    }
                  }}
                  className="px-4 py-2 bg-[#6B8E23] text-white rounded-lg font-medium hover:bg-[#5A7A1A] transition-colors"
                >
                  Calculate Price
                </button>
              </div>
              {customWeight && !isNaN(parseFloat(customWeight)) && parseFloat(customWeight) > 0 && (
                <div className="text-sm text-[#696969]">
                  Custom {customWeight}kg price: <span className="font-bold text-[#DC143C]">{handleCustomWeight()}</span>
                </div>
              )}
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

            {/* Selected Configuration Summary */}
            <div className="bg-gray-50 rounded-lg p-4 border border-[#E5E5E5]">
              <h4 className="font-semibold text-[#333333] mb-2">Selected Configuration:</h4>
              <div className="text-sm text-[#696969] space-y-1">
                <div>Brand: {brands.find(b => b.id === selectedBrand)?.name}</div>
                <div>Grain Type: {grainTypes.find(gt => gt.id === selectedGrainType)?.value}</div>
                <div>Polish Type: {polishTypes.find(pt => pt.id === selectedPolishType)?.value}</div>
                <div>Weight: {selectedSize}</div>
                <div>Delivery: {deliveryOption === 'home' ? 'Home Delivery' : 'Store Pickup'}</div>
                {deliveryOption === 'store' && selectedStore && (
                  <div>Store: {selectedStore.name}</div>
                )}
                <div className="font-bold text-[#DC143C]">Total: {currentPrice}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 pt-4">
              {deliveryOption === 'store' && selectedStore ? (
                <>
                  <button
                    onClick={handleReserveAndPayAtStore}
                    disabled={!isConfigurationAvailable()}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 lg:py-4 px-6 rounded-lg transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm lg:text-base"
                  >
                    📍 Reserve & Pay at Store
                  </button>
                  <button
                    onClick={handleAddToCart}
                    disabled={!isConfigurationAvailable()}
                    className="bg-[#6B8E23] hover:bg-[#5A7A1A] text-white font-bold py-3 lg:py-4 px-6 rounded-lg transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm lg:text-base"
                  >
                    Add to Cart
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleAddToCart}
                    disabled={!isConfigurationAvailable()}
                    className="bg-[#6B8E23] hover:bg-[#5A7A1A] text-white font-bold py-3 lg:py-4 px-6 rounded-lg transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm lg:text-base"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={!isConfigurationAvailable()}
                    className="bg-[#DC143C] hover:bg-[#C1121F] text-white font-bold py-3 lg:py-4 px-6 rounded-lg transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm lg:text-base"
                  >
                    Buy Now
                  </button>
                </>
              )}
            </div>

            {/* Additional Info */}
            <div className="border-t border-[#E5E5E5] pt-6 space-y-4">
              <div className="flex items-center space-x-2 text-sm text-[#696969]">
                <span className="font-semibold text-[#333333]">Category:</span>
                <span>{product.category}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-[#696969]">
                <span className="font-semibold text-[#333333]">Base Weight:</span>
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
                    <h4 className="font-semibold text-[#333333]">Available Variants:</h4>
                    <ul className="text-[#696969] list-disc list-inside space-y-1">
                      <li>Multiple grain types (Long, Short, Broken)</li>
                      <li>Different polish levels</li>
                      <li>Premium and standard brands</li>
                      <li>Various weight packages</li>
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