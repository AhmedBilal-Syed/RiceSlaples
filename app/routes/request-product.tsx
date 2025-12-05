// app/routes/request-product.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "~/Components/Footer";
import Header from "~/Components/Header";

interface ProductItem {
  id: number;
  productName: string;
  categories: string[];
  quantity: string;
  urgency: "Low" | "Medium" | "High";
  description: string;
}

interface ProductRequest {
  id: number;
  products: ProductItem[];
  status: "Pending" | "In Progress" | "Rejected" | "Not Available" | "Available" | "Delivered";
  submittedDate: string;
  estimatedDelivery?: string;
  rejectionReason?: string;
  paymentStatus?: "Pending" | "Received";
  notes?: string;
}

const RequestProductPage = () => {
  const [formData, setFormData] = useState({
    products: [{
      id: 1,
      productName: "",
      categories: [] as string[],
      quantity: "",
      urgency: "Medium" as "Low" | "Medium" | "High",
      description: ""
    }],
    specialRequirements: ""
  });

  const [requests, setRequests] = useState<ProductRequest[]>([
    {
      id: 1,
      products: [{
        id: 1,
        productName: "Organic Blueberries",
        categories: ["Fruits", "Organic"],
        quantity: "50kg",
        urgency: "High",
        description: "Fresh organic blueberries for smoothie production"
      }],
      status: "Delivered",
      submittedDate: "2024-01-15",
      estimatedDelivery: "2024-01-25",
      paymentStatus: "Received"
    },
    {
      id: 2,
      products: [{
        id: 1,
        productName: "Avocado Oil",
        categories: ["Oils"],
        quantity: "20L",
        urgency: "Medium",
        description: "Cold-pressed avocado oil for cooking"
      }],
      status: "In Progress",
      submittedDate: "2024-01-12",
      estimatedDelivery: "2024-02-01"
    },
    {
      id: 3,
      products: [{
        id: 1,
        productName: "Quinoa Grain",
        categories: ["Grains", "Organic"],
        quantity: "100kg",
        urgency: "Low",
        description: "Organic quinoa for health food line"
      }],
      status: "Pending",
      submittedDate: "2024-01-18"
    },
    {
      id: 4,
      products: [{
        id: 1,
        productName: "Mango Pulp",
        categories: ["Fruits", "Frozen"],
        quantity: "30kg",
        urgency: "High",
        description: "Frozen mango pulp for juice production"
      }],
      status: "Rejected",
      submittedDate: "2024-01-10",
      rejectionReason: "Supplier unavailable until next season"
    },
    {
      id: 5,
      products: [{
        id: 1,
        productName: "Japanese Matcha",
        categories: ["Beverages", "Organic"],
        quantity: "5kg",
        urgency: "Medium",
        description: "Premium grade matcha powder"
      }],
      status: "Not Available",
      submittedDate: "2024-01-08",
      rejectionReason: "Product discontinued by manufacturer"
    }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"form" | "history">("form");

  const categories = [
    "Fruits", "Vegetables", "Grains", "Dairy", "Meat", "Seafood",
    "Oils", "Spices", "Beverages", "Snacks", "Frozen", "Organic",
    "Gluten-Free", "Vegan", "Keto", "Paleo"
  ];

  // Product Management
  const addProduct = () => {
    setFormData(prev => ({
      ...prev,
      products: [
        ...prev.products,
        {
          id: Date.now(),
          productName: "",
          categories: [] as string[],
          quantity: "",
          urgency: "Medium",
          description: ""
        }
      ]
    }));
  };

  const removeProduct = (productId: number) => {
    if (formData.products.length > 1) {
      setFormData(prev => ({
        ...prev,
        products: prev.products.filter(product => product.id !== productId)
      }));
    }
  };

  const updateProduct = (productId: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.map(product =>
        product.id === productId ? { ...product, [field]: value } : product
      )
    }));
  };

  const handleCategoryToggle = (productId: number, category: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.map(product => {
        if (product.id === productId) {
          const updatedCategories = product.categories.includes(category)
            ? product.categories.filter(c => c !== category)
            : [...product.categories, category];
          return { ...product, categories: updatedCategories };
        }
        return product;
      })
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    const hasEmptyFields = formData.products.some(product => 
      !product.productName.trim() || 
      !product.quantity.trim() || 
      product.categories.length === 0
    );

    if (hasEmptyFields) {
      alert("Please fill in all required fields for all products");
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newRequest: ProductRequest = {
      id: Date.now(),
      products: formData.products,
      status: "Pending",
      submittedDate: new Date().toISOString().split('T')[0]
    };

    setRequests(prev => [newRequest, ...prev]);
    
    // Reset form
    setFormData({
      products: [{
        id: 1,
        productName: "",
        categories: [] as string[],
        quantity: "",
        urgency: "Medium",
        description: ""
      }],
      specialRequirements: ""
    });

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setActiveTab("history");
    
    // Hide success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-[#b91d08]/10 text-[#b91d08] border-[#b91d08]/20';
      case 'Available': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'Not Available': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Received': return 'bg-[#b91d08]/10 text-[#b91d08]';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-[#b91d08]/10 text-[#b91d08]';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return '✅';
      case 'Available': return '📦';
      case 'In Progress': return '🔄';
      case 'Pending': return '⏳';
      case 'Rejected': return '❌';
      case 'Not Available': return '🚫';
      default: return '📋';
    }
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case 'Received': return '💳';
      case 'Pending': return '⏳';
      default: return '💰';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'High': return '🔥';
      case 'Medium': return '⚡';
      case 'Low': return '🌱';
      default: return '📦';
    }
  };

  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'Pending': return 'Your request is under review';
      case 'In Progress': return 'We are sourcing your products';
      case 'Rejected': return 'Request cannot be fulfilled';
      case 'Not Available': return 'Products are not available';
      case 'Available': return 'Products are ready for shipping';
      case 'Delivered': return 'Products have been delivered';
      default: return 'Status unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#b91d08]/10 rounded-2xl mb-6">
                <span className="text-3xl text-[#b91d08]">📦</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Request Products</h1>
              <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                Can't find what you're looking for? Request multiple products and we'll do our best to source them for you.
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex bg-white rounded-2xl shadow-sm border border-gray-200 p-2 mb-8 max-w-md mx-auto">
              <button
                onClick={() => setActiveTab("form")}
                className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === "form" 
                    ? "bg-[#b91d08] text-white shadow-lg shadow-[#b91d08]/20" 
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                New Request
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === "history" 
                    ? "bg-[#b91d08] text-white shadow-lg shadow-[#b91d08]/20" 
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Request History
              </button>
            </div>

            {activeTab === "form" ? (
              // Request Form
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[#b91d08]/10 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-xl text-[#b91d08]">✨</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">New Product Request</h2>
                      <p className="text-gray-700">Add multiple products and their details</p>
                    </div>
                  </div>
                  <button
                    onClick={addProduct}
                    className="flex items-center bg-[#b91d08] hover:bg-[#9e1807] text-white px-4 py-2 rounded-lg transition-colors font-bold"
                  >
                    <span className="mr-2">+</span>
                    Add Product
                  </button>
                </div>
                
                {submitSuccess && (
                  <div className="bg-[#b91d08]/10 border border-[#b91d08]/20 rounded-xl p-6 mb-8">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#b91d08]/20 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#b91d08]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-bold text-[#b91d08]">Request Submitted!</h3>
                        <p className="text-gray-700 mt-1">
                          Your product request has been submitted successfully. We'll review it and get back to you soon.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Products List */}
                  {formData.products.map((product, index) => (
                    <div key={product.id} className="border-2 border-gray-200 rounded-2xl p-6 relative">
                      {formData.products.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeProduct(product.id)}
                          className="absolute -top-3 -right-3 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      )}
                      
                      <div className="flex items-center mb-6">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mr-3">
                          <span className="text-lg text-gray-700">#{index + 1}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Product {index + 1}</h3>
                      </div>

                      <div className="space-y-6">
                        {/* Product Name */}
                        <div className="space-y-3">
                          <label className="block text-lg font-bold text-gray-900">
                            Product Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={product.productName}
                            onChange={(e) => updateProduct(product.id, 'productName', e.target.value)}
                            className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg focus:border-[#b91d08] focus:ring-4 focus:ring-[#b91d08]/10 transition-all duration-300 text-gray-900"
                            placeholder="e.g., Organic Blueberries, Avocado Oil, etc."
                            required
                          />
                        </div>

                        {/* Categories - Checkbox Selection */}
                        <div className="space-y-3">
                          <label className="block text-lg font-bold text-gray-900">
                            Categories <span className="text-red-500">*</span>
                            <span className="text-sm text-gray-600 ml-2">(Select all that apply)</span>
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {categories.map(category => (
                              <label key={category} className="flex items-center space-x-2 p-3 border-2 border-gray-200 rounded-xl hover:border-[#b91d08]/50 transition-colors cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={product.categories.includes(category)}
                                  onChange={() => handleCategoryToggle(product.id, category)}
                                  className="w-4 h-4 text-[#b91d08] border-gray-300 rounded focus:ring-[#b91d08]"
                                />
                                <span className="text-sm font-medium text-gray-700">{category}</span>
                              </label>
                            ))}
                          </div>
                          {product.categories.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {product.categories.map(category => (
                                <span key={category} className="bg-[#b91d08]/10 text-[#b91d08] px-3 py-1 rounded-lg text-sm font-medium">
                                  {category}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Quantity and Urgency */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <label className="block text-lg font-bold text-gray-900">
                              Quantity <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={product.quantity}
                              onChange={(e) => updateProduct(product.id, 'quantity', e.target.value)}
                              className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg focus:border-[#b91d08] focus:ring-4 focus:ring-[#b91d08]/10 transition-all duration-300 text-gray-900"
                              placeholder="e.g., 50kg, 20L, 100 units"
                              required
                            />
                          </div>
                          
                          <div className="space-y-3">
                            <label className="block text-lg font-bold text-gray-900">
                              Urgency Level <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                              {(['Low', 'Medium', 'High'] as const).map((level) => (
                                <button
                                  key={level}
                                  type="button"
                                  onClick={() => updateProduct(product.id, 'urgency', level)}
                                  className={`p-3 border-2 rounded-xl text-center transition-all duration-300 ${
                                    product.urgency === level
                                      ? 'border-[#b91d08] bg-[#b91d08]/5 shadow-lg shadow-[#b91d08]/10'
                                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                                  }`}
                                >
                                  <div className={`text-lg mb-1 ${getUrgencyColor(level).replace('bg-', 'text-')}`}>
                                    {getUrgencyIcon(level)}
                                  </div>
                                  <div className={`text-sm font-bold ${
                                    product.urgency === level ? 'text-[#b91d08]' : 'text-gray-700'
                                  }`}>
                                    {level}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-3">
                          <label className="block text-lg font-bold text-gray-900">
                            Product Description <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            value={product.description}
                            onChange={(e) => updateProduct(product.id, 'description', e.target.value)}
                            rows={3}
                            className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg focus:border-[#b91d08] focus:ring-4 focus:ring-[#b91d08]/10 transition-all duration-300 resize-none text-gray-900"
                            placeholder="Please describe the product, including any specific requirements like organic, brand preferences, packaging, etc."
                            
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Special Requirements */}
                  <div className="space-y-3">
                    <label className="block text-lg font-bold text-gray-900">
                      Special Requirements <span className="text-gray-600 text-sm">(Optional)</span>
                    </label>
                    <textarea
                      value={formData.specialRequirements}
                      onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                      rows={3}
                      className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg focus:border-[#b91d08] focus:ring-4 focus:ring-[#b91d08]/10 transition-all duration-300 resize-none text-gray-900"
                      placeholder="Any additional requirements or notes for the entire order..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#b91d08] hover:bg-[#9e1807] text-white py-5 rounded-2xl disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 font-bold text-lg flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting Request...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">🚀</span>
                        Submit Product Request ({formData.products.length} {formData.products.length === 1 ? 'product' : 'products'})
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              // Request History
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-xl text-gray-700">📋</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Request History</h2>
                      <p className="text-gray-700">Track your submitted product requests</p>
                    </div>
                  </div>
                  <span className="bg-[#b91d08]/10 text-[#b91d08] px-4 py-2 rounded-xl text-sm font-bold">
                    {requests.length} requests
                  </span>
                </div>

                {requests.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-8xl mb-6 opacity-50">📭</div>
                    <h3 className="text-2xl font-bold text-gray-600 mb-4">No Requests Yet</h3>
                    <p className="text-gray-600 text-lg mb-8">You haven't submitted any product requests yet.</p>
                    <button
                      onClick={() => setActiveTab("form")}
                      className="bg-[#b91d08] hover:bg-[#9e1807] text-white px-8 py-4 rounded-2xl transition-colors font-bold text-lg"
                    >
                      Make Your First Request
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {requests.map((request) => (
                      <div key={request.id} className="border-2 border-gray-100 rounded-2xl p-6 hover:border-[#b91d08]/20 hover:shadow-lg transition-all duration-300 group">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#b91d08] transition-colors">
                                  Request #{request.id}
                                </h3>
                                <p className="text-gray-700 mt-1">{getStatusDescription(request.status)}</p>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <span className={`px-4 py-2 rounded-xl text-sm font-bold border-2 ${getStatusColor(request.status)}`}>
                                  {getStatusIcon(request.status)} {request.status}
                                </span>
                                {request.paymentStatus && (
                                  <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getPaymentStatusColor(request.paymentStatus)}`}>
                                    {getPaymentStatusIcon(request.paymentStatus)} Payment {request.paymentStatus}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Products in this request */}
                            <div className="space-y-4">
                              {request.products.map((product, index) => (
                                <div key={product.id} className="border border-gray-200 rounded-xl p-4">
                                  <div className="flex items-start justify-between mb-3">
                                    <h4 className="font-bold text-gray-900">
                                      {product.productName}
                                    </h4>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getUrgencyColor(product.urgency)}`}>
                                      {getUrgencyIcon(product.urgency)} {product.urgency}
                                    </span>
                                  </div>
                                  
                                  <div className="flex flex-wrap gap-2 mb-3">
                                    {product.categories.map(category => (
                                      <span key={category} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                                        {category}
                                      </span>
                                    ))}
                                    <span className="bg-[#b91d08]/10 text-[#b91d08] px-2 py-1 rounded text-xs font-medium">
                                      {product.quantity}
                                    </span>
                                  </div>
                                  
                                  <p className="text-gray-700 text-sm">{product.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-200">
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <span className="mr-2">📅</span>
                              Submitted: {request.submittedDate}
                            </span>
                            {request.estimatedDelivery && (
                              <span className="flex items-center">
                                <span className="mr-2">🚚</span>
                                Est. Delivery: {request.estimatedDelivery}
                              </span>
                            )}
                          </div>
                          
                          {(request.status === 'Rejected' || request.status === 'Not Available') && request.rejectionReason && (
                            <div className="flex-1 max-w-md">
                              <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                                <div className="flex items-start">
                                  <span className="text-red-600 mr-2 mt-1">💡</span>
                                  <div>
                                    <p className="font-bold text-red-800 text-sm mb-1">Reason</p>
                                    <p className="text-red-700 text-sm">{request.rejectionReason}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {request.notes && (
                          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                            <div className="flex items-start">
                              <span className="text-yellow-600 mr-3 mt-1">📝</span>
                              <div>
                                <p className="font-bold text-yellow-800 mb-1">Additional Notes</p>
                                <p className="text-yellow-700">{request.notes}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Additional Info */}
            <div className="mt-12 bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300 rounded-2xl p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-700">
                  <span className="text-2xl">💡</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">How Product Requests Work</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#b91d08] text-xl mx-auto mb-3 shadow-sm">
                        1
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">Submit Request</h4>
                      <p className="text-gray-700 text-sm">Add multiple products with categories and requirements</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#b91d08] text-xl mx-auto mb-3 shadow-sm">
                        2
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">We Source</h4>
                      <p className="text-gray-700 text-sm">Our team searches for suppliers that match your needs</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#b91d08] text-xl mx-auto mb-3 shadow-sm">
                        3
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">Track Status</h4>
                      <p className="text-gray-700 text-sm">Monitor progress from Pending to Delivered with real updates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RequestProductPage;