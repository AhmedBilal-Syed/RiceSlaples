// // app/routes/deal.$slug.tsx
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { FaHeart, FaRegHeart, FaShoppingCart, FaShare, FaClock, FaStar, FaArrowLeft } from "react-icons/fa";
// import type { Route } from "./+types/deal.$slug";

// // Define the interface and data here since we're having import issues
// interface DealProduct {
//   id: number;
//   slug: string;
//   name: string;
//   price: string;
//   originalPrice?: string;
//   image: string;
//   timer: string;
//   inStock?: boolean;
//   isFavorite?: boolean;
//   category?: string;
//   description?: string;
//   images?: string[];
//   features?: string[];
//   nutrition?: {
//     calories: string;
//     protein: string;
//     carbs: string;
//     fat: string;
//   };
//   weight?: string;
//   origin?: string;
//   storage?: string;
//   rating?: number;
//   reviews?: number;
// }

// // Data array - same as in DealOfTheDay component
// const defaultDealProducts: DealProduct[] = [
//   {
//     id: 1,
//     slug: "mung-beans-premium",
//     name: "Premium Organic Mung Beans",
//     price: "€31.00",
//     originalPrice: "€38.00",
//     image: "🫘",
//     images: ["🫘", "🌱", "🥣"],
//     timer: "729 12 55 27",
//     inStock: true,
//     isFavorite: false,
//     category: "Organic Beans",
//     description: "Premium quality organic mung beans, carefully selected for their excellent nutritional value and taste. Rich in protein, fiber, and essential nutrients, these beans are perfect for sprouting, cooking traditional dishes, or adding to salads and soups.",
//     features: [
//       "100% Organic Certified",
//       "Rich in Protein and Fiber",
//       "Perfect for Sprouting",
//       "Non-GMO Project Verified",
//       "Excellent for Asian Cuisine"
//     ],
//     nutrition: {
//       calories: "347 kcal",
//       protein: "24g",
//       carbs: "63g",
//       fat: "1.2g"
//     },
//     weight: "500g",
//     origin: "India",
//     storage: "Cool, dry place",
//     rating: 4.5,
//     reviews: 128
//   },
//   {
//     id: 2,
//     slug: "natural-soyabean-organic",
//     name: "Natural Organic Soyabean",
//     price: "€14.00",
//     originalPrice: "€18.00",
//     image: "🌱",
//     images: ["🌱", "🫘", "🥛"],
//     timer: "729 12 55 27",
//     inStock: true,
//     isFavorite: false,
//     category: "Organic Beans",
//     description: "High-quality organic soybeans packed with complete protein and essential amino acids. Ideal for making tofu, soy milk, tempeh, or incorporating into various dishes for a nutritional boost.",
//     features: [
//       "Complete Protein Source",
//       "Rich in Essential Amino Acids",
//       "Perfect for Tofu & Soy Milk",
//       "USDA Organic Certified",
//       "Versatile Cooking Uses"
//     ],
//     nutrition: {
//       calories: "446 kcal",
//       protein: "36g",
//       carbs: "30g",
//       fat: "20g"
//     },
//     weight: "500g",
//     origin: "USA",
//     storage: "Cool, dry place",
//     rating: 4.3,
//     reviews: 89
//   },
//   {
//     id: 3,
//     slug: "red-beans-premium",
//     name: "Premium Red Kidney Beans",
//     price: "€31.00",
//     originalPrice: "€35.00",
//     image: "🫘",
//     images: ["🫘", "🍲", "🥗"],
//     timer: "729 12 55 27",
//     inStock: true,
//     isFavorite: false,
//     category: "Beans & Legumes",
//     description: "High-quality red kidney beans with excellent texture and flavor. Perfect for chili, stews, salads, and traditional recipes. Rich in iron, antioxidants, and dietary fiber.",
//     features: [
//       "Excellent Source of Iron",
//       "High in Antioxidants",
//       "Perfect for Chili & Stews",
//       "Rich Dietary Fiber",
//       "Long Shelf Life"
//     ],
//     nutrition: {
//       calories: "337 kcal",
//       protein: "22g",
//       carbs: "61g",
//       fat: "1.1g"
//     },
//     weight: "500g",
//     origin: "Mexico",
//     storage: "Cool, dry place",
//     rating: 4.7,
//     reviews: 156
//   }
// ];

// export function meta({ params }: Route.MetaArgs) {
//   return [
//     { title: `Deal - ${params.slug}` },
//     { name: "description", content: "Amazing deal of the day" },
//   ];
// }

// export default function DealDetailPage({ params }: Route.ComponentProps) {
//   const { slug } = params;
//   const navigate = useNavigate();
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [product, setProduct] = useState<DealProduct | null>(null);
//   const [isFavorite, setIsFavorite] = useState(false);

//   useEffect(() => {
//     // Find product by slug
//     const foundProduct = defaultDealProducts.find(p => p.slug === slug);
//     if (foundProduct) {
//       setProduct(foundProduct);
//       setIsFavorite(foundProduct.isFavorite || false);
//     }
//   }, [slug]);

//   const handleAddToCart = () => {
//     if (!product) return;
//     console.log("Added to cart:", product, "Quantity:", quantity);
//     // Add your cart logic here
//   };

//   const handleToggleFavorite = () => {
//     setIsFavorite(!isFavorite);
//     console.log("Toggled favorite for product:", product?.id);
//     // Add your favorite logic here
//   };

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: product?.name,
//         text: product?.description,
//         url: window.location.href,
//       });
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       alert("Link copied to clipboard!");
//     }
//   };

//   const incrementQuantity = () => setQuantity(prev => prev + 1);
//   const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Deal Not Found</h2>
//           <button
//             onClick={() => navigate('/')}
//             className="bg-[#6B8E23] hover:bg-[#5A7A1A] text-white font-semibold py-2 px-6 rounded-lg transition-colors"
//           >
//             Back to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const timerParts = product.timer.split(" ");
//   const relatedProducts = defaultDealProducts
//     .filter(p => p.id !== product.id)
//     .slice(0, 3);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Breadcrumb */}
//       <nav className="bg-white border-b border-gray-200">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center space-x-2 text-sm text-gray-600">
//             <Link 
//               to="/" 
//               className="hover:text-[#6B8E23] transition-colors flex items-center space-x-1"
//             >
//               <FaArrowLeft className="w-3 h-3" />
//               <span>Home</span>
//             </Link>
//             <span>/</span>
//             <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
//           </div>
//         </div>
//       </nav>

//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
//             {/* Product Images */}
//             <div className="space-y-4">
//               {/* Main Image */}
//               <div className="bg-white border border-gray-200 rounded-lg p-8 flex items-center justify-center h-80">
//                 <span className="text-8xl" role="img" aria-label={product.name}>
//                   {(product.images?.[selectedImage] || product.image)}
//                 </span>
//               </div>
              
//               {/* Image Thumbnails */}
//               <div className="flex space-x-4 overflow-x-auto pb-2">
//                 {(product.images || [product.image]).map((img, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedImage(index)}
//                     className={`flex-shrink-0 w-16 h-16 border-2 rounded-lg flex items-center justify-center text-2xl transition-colors ${
//                       selectedImage === index 
//                         ? 'border-[#6B8E23] bg-green-50' 
//                         : 'border-gray-200 hover:border-gray-300'
//                     }`}
//                   >
//                     {img}
//                   </button>
//                 ))}
//               </div>

//               {/* Deal Timer */}
//               <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                 <div className="flex items-center space-x-2 mb-3">
//                   <FaClock className="text-red-600" />
//                   <span className="text-red-800 font-semibold">Deal ends in:</span>
//                 </div>
//                 <div className="flex space-x-3">
//                   {["Days", "Hours", "Minutes", "Seconds"].map((unit, index) => (
//                     <div key={unit} className="text-center">
//                       <div className="bg-white text-red-600 border border-red-200 px-3 py-2 rounded font-mono font-bold text-lg min-w-[3rem]">
//                         {timerParts[index]}
//                       </div>
//                       <div className="text-red-700 text-xs mt-1 font-medium">{unit}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Product Info */}
//             <div className="space-y-6">
//               {/* Header */}
//               <div>
//                 <div className="flex items-center justify-between mb-3">
//                   <span className="bg-[#6B8E23] text-white px-3 py-1 rounded-full text-sm font-bold">
//                     Deal of the Day
//                   </span>
//                   <div className="flex space-x-3">
//                     <button
//                       onClick={handleToggleFavorite}
//                       className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
//                     >
//                       {isFavorite ? (
//                         <FaHeart className="text-[#DC143C] w-5 h-5" />
//                       ) : (
//                         <FaRegHeart className="text-gray-600 w-5 h-5" />
//                       )}
//                     </button>
//                     <button
//                       onClick={handleShare}
//                       className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
//                     >
//                       <FaShare className="text-gray-600 w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
                
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                
//                 {/* Rating */}
//                 {product.rating && (
//                   <div className="flex items-center space-x-2 mb-4">
//                     <div className="flex">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <FaStar
//                           key={star}
//                           className={`w-4 h-4 ${
//                             star <= (product.rating || 0) 
//                               ? 'text-yellow-400 fill-current' 
//                               : 'text-gray-300'
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-gray-600 text-sm">
//                       {product.rating} ({product.reviews} reviews)
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* Price */}
//               <div className="flex items-center space-x-4">
//                 <span className="text-3xl font-bold text-[#DC143C]">{product.price}</span>
//                 {product.originalPrice && (
//                   <span className="text-xl text-gray-500 line-through">{product.originalPrice}</span>
//                 )}
//                 {product.originalPrice && (
//                   <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-bold">
//                     Save {(
//                       (parseFloat(product.originalPrice.replace('€', '')) - 
//                        parseFloat(product.price.replace('€', ''))) / 
//                       parseFloat(product.originalPrice.replace('€', '')) * 100
//                     ).toFixed(0)}%
//                   </span>
//                 )}
//               </div>

//               {/* Description */}
//               <p className="text-gray-700 leading-relaxed">{product.description}</p>

//               {/* Product Details */}
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 {product.category && (
//                   <div>
//                     <span className="font-semibold text-gray-600">Category:</span>
//                     <span className="ml-2 text-gray-900">{product.category}</span>
//                   </div>
//                 )}
//                 {product.weight && (
//                   <div>
//                     <span className="font-semibold text-gray-600">Weight:</span>
//                     <span className="ml-2 text-gray-900">{product.weight}</span>
//                   </div>
//                 )}
//                 {product.origin && (
//                   <div>
//                     <span className="font-semibold text-gray-600">Origin:</span>
//                     <span className="ml-2 text-gray-900">{product.origin}</span>
//                   </div>
//                 )}
//                 {product.storage && (
//                   <div>
//                     <span className="font-semibold text-gray-600">Storage:</span>
//                     <span className="ml-2 text-gray-900">{product.storage}</span>
//                   </div>
//                 )}
//               </div>

//               {/* Nutrition Info */}
//               {product.nutrition && (
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <h3 className="font-semibold text-gray-900 mb-3">Nutrition Facts (per 100g)</h3>
//                   <div className="grid grid-cols-2 gap-3 text-sm">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Calories:</span>
//                       <span className="font-semibold">{product.nutrition.calories}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Protein:</span>
//                       <span className="font-semibold">{product.nutrition.protein}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Carbohydrates:</span>
//                       <span className="font-semibold">{product.nutrition.carbs}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Fat:</span>
//                       <span className="font-semibold">{product.nutrition.fat}</span>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Features */}
//               {product.features && (
//                 <div>
//                   <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
//                   <ul className="space-y-2">
//                     {product.features.map((feature, index) => (
//                       <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
//                         <span className="w-2 h-2 bg-[#6B8E23] rounded-full"></span>
//                         <span>{feature}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {/* Add to Cart Section */}
//               <div className="border-t border-gray-200 pt-6">
//                 <div className="flex items-center space-x-4 mb-4">
//                   <span className="font-semibold text-gray-900">Quantity:</span>
//                   <div className="flex items-center space-x-3">
//                     <button
//                       onClick={decrementQuantity}
//                       className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
//                     >
//                       -
//                     </button>
//                     <span className="w-12 text-center font-semibold">{quantity}</span>
//                     <button
//                       onClick={incrementQuantity}
//                       className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex space-x-4">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={!product.inStock}
//                     className="flex-1 bg-[#6B8E23] hover:bg-[#5A7A1A] disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
//                   >
//                     <FaShoppingCart className="w-5 h-5" />
//                     <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
//                   </button>
//                   <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
//                     Buy Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Related Products Section - Simplified without DealOfTheDay component */}
//         {relatedProducts.length > 0 && (
//           <div className="mt-12">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {relatedProducts.map((relatedProduct) => (
//                 <div key={relatedProduct.id} className="border border-[#E5E5E5] bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full p-4 group cursor-pointer">
//                   <div className="w-full h-48 flex items-center justify-center bg-white border border-[#E5E5E5] rounded-lg mb-4 p-4">
//                     <span className="text-6xl" role="img" aria-label={relatedProduct.name}>
//                       {relatedProduct.image}
//                     </span>
//                   </div>
//                   <h3 className="font-bold text-[#333333] text-lg mb-2 leading-tight line-clamp-2">
//                     {relatedProduct.name}
//                   </h3>
//                   <div className="flex items-center gap-2 mb-4">
//                     <span className="text-[#DC143C] font-bold text-lg">{relatedProduct.price}</span>
//                     {relatedProduct.originalPrice && (
//                       <span className="text-[#696969] line-through text-sm">{relatedProduct.originalPrice}</span>
//                     )}
//                   </div>
//                   <Link 
//                     to={`/deals/${relatedProduct.slug}`}
//                     className="text-center text-[#6B8E23] hover:text-[#5A7A1A] font-medium text-sm mt-3 transition-colors"
//                   >
//                     View Details →
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }