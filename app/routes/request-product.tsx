// app/routes/request-product.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "~/Components/Footer";
import Header from "~/Components/Header";

interface ProductRequest {
  id: number;
  productName: string;
  category: string;
  quantity: string;
  urgency: "Low" | "Medium" | "High";
  description: string;
  status: "Pending" | "Approved" | "Rejected" | "In Progress";
  submittedDate: string;
  estimatedDelivery?: string;
  notes?: string;
}

const RequestProductPage = () => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    quantity: "",
    urgency: "Medium" as "Low" | "Medium" | "High",
    description: "",
    specialRequirements: ""
  });

  const [requests, setRequests] = useState<ProductRequest[]>([
    {
      id: 1,
      productName: "Organic Blueberries",
      category: "Fruits",
      quantity: "50kg",
      urgency: "High",
      description: "Fresh organic blueberries for smoothie production",
      status: "Approved",
      submittedDate: "2024-01-15",
      estimatedDelivery: "2024-01-25"
    },
    {
      id: 2,
      productName: "Avocado Oil",
      category: "Oils",
      quantity: "20L",
      urgency: "Medium",
      description: "Cold-pressed avocado oil for cooking",
      status: "In Progress",
      submittedDate: "2024-01-12",
      estimatedDelivery: "2024-02-01"
    },
    {
      id: 3,
      productName: "Quinoa Grain",
      category: "Grains",
      quantity: "100kg",
      urgency: "Low",
      description: "Organic quinoa for health food line",
      status: "Pending",
      submittedDate: "2024-01-18"
    },
    {
      id: 4,
      productName: "Mango Pulp",
      category: "Fruits",
      quantity: "30kg",
      urgency: "High",
      description: "Frozen mango pulp for juice production",
      status: "Rejected",
      submittedDate: "2024-01-10",
      notes: "Supplier unavailable until next season"
    }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"form" | "history">("form");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newRequest: ProductRequest = {
      id: Date.now(),
      productName: formData.productName,
      category: formData.category,
      quantity: formData.quantity,
      urgency: formData.urgency,
      description: formData.description,
      status: "Pending",
      submittedDate: new Date().toISOString().split('T')[0]
    };

    setRequests(prev => [newRequest, ...prev]);
    
    // Reset form
    setFormData({
      productName: "",
      category: "",
      quantity: "",
      urgency: "Medium",
      description: "",
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
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return '✅';
      case 'In Progress': return '🔄';
      case 'Pending': return '⏳';
      case 'Rejected': return '❌';
      default: return '📋';
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

  const categories = [
    "Fruits", "Vegetables", "Grains", "Dairy", "Meat", "Seafood",
    "Oils", "Spices", "Beverages", "Snacks", "Frozen", "Organic"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-2xl mb-6">
                <span className="text-3xl">📦</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Request a Product</h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Can't find what you're looking for? Request a product and we'll do our best to source it for you.
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex bg-white rounded-2xl shadow-sm border border-gray-200 p-2 mb-8 max-w-md mx-auto">
              <button
                onClick={() => setActiveTab("form")}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === "form" 
                    ? "bg-green-600 text-white shadow-lg shadow-green-200" 
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                New Request
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === "history" 
                    ? "bg-green-600 text-white shadow-lg shadow-green-200" 
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Request History
              </button>
            </div>

            {activeTab === "form" ? (
              // Request Form
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-xl">✨</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">New Product Request</h2>
                    <p className="text-gray-600">Fill out the form below to request a product</p>
                  </div>
                </div>
                
                {submitSuccess && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-green-800">Request Submitted!</h3>
                        <p className="text-green-700 mt-1">
                          Your product request has been submitted successfully. We'll review it and get back to you soon.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Product Name */}
                  <div className="space-y-3">
                    <label className="block text-lg font-semibold text-gray-800">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.productName}
                      onChange={(e) => handleInputChange('productName', e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                      placeholder="e.g., Organic Blueberries, Avocado Oil, etc."
                      required
                    />
                  </div>

                  {/* Category and Quantity */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="block text-lg font-semibold text-gray-800">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 appearance-none bg-white"
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="block text-lg font-semibold text-gray-800">
                        Quantity <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.quantity}
                        onChange={(e) => handleInputChange('quantity', e.target.value)}
                        className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                        placeholder="e.g., 50kg, 20L, 100 units"
                        required
                      />
                    </div>
                  </div>

                  {/* Urgency */}
                  <div className="space-y-4">
                    <label className="block text-lg font-semibold text-gray-800">
                      Urgency Level <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {(['Low', 'Medium', 'High'] as const).map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => handleInputChange('urgency', level)}
                          className={`p-6 border-2 rounded-2xl text-center transition-all duration-300 group ${
                            formData.urgency === level
                              ? 'border-green-500 bg-green-50 shadow-lg shadow-green-100'
                              : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:shadow-md'
                          }`}
                        >
                          <div className={`text-2xl mb-2 transition-transform duration-300 ${
                            formData.urgency === level ? 'scale-110' : 'group-hover:scale-105'
                          }`}>
                            {getUrgencyIcon(level)}
                          </div>
                          <div className={`font-semibold ${
                            formData.urgency === level ? 'text-green-700' : 'text-gray-700'
                          }`}>
                            {level}
                          </div>
                          <div className={`text-sm mt-1 ${
                            formData.urgency === level ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {level === 'Low' && 'Within 2 weeks'}
                            {level === 'Medium' && 'Within 1 week'}
                            {level === 'High' && 'Within 3 days'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-3">
                    <label className="block text-lg font-semibold text-gray-800">
                      Product Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 resize-none"
                      placeholder="Please describe the product, including any specific requirements like organic, brand preferences, packaging, etc."
                      required
                    />
                  </div>

                  {/* Special Requirements */}
                  <div className="space-y-3">
                    <label className="block text-lg font-semibold text-gray-800">
                      Special Requirements <span className="text-gray-500 text-sm">(Optional)</span>
                    </label>
                    <textarea
                      value={formData.specialRequirements}
                      onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                      rows={3}
                      className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 resize-none"
                      placeholder="Any additional requirements or notes..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-5 rounded-2xl hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 font-bold text-lg flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
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
                        Submit Product Request
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              // Request History
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-xl">📋</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Request History</h2>
                      <p className="text-gray-600">Track your submitted product requests</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-xl text-sm font-semibold">
                    {requests.length} requests
                  </span>
                </div>

                {requests.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-8xl mb-6 opacity-50">📭</div>
                    <h3 className="text-2xl font-bold text-gray-600 mb-4">No Requests Yet</h3>
                    <p className="text-gray-500 text-lg mb-8">You haven't submitted any product requests yet.</p>
                    <button
                      onClick={() => setActiveTab("form")}
                      className="bg-green-600 text-white px-8 py-4 rounded-2xl hover:bg-green-700 transition-colors font-semibold text-lg"
                    >
                      Make Your First Request
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {requests.map((request) => (
                      <div key={request.id} className="border-2 border-gray-100 rounded-2xl p-6 hover:border-green-200 hover:shadow-lg transition-all duration-300 group">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors">
                                {request.productName}
                              </h3>
                              <span className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 ${getStatusColor(request.status)}`}>
                                {getStatusIcon(request.status)} {request.status}
                              </span>
                            </div>
                            
                            <div className="flex flex-wrap gap-3 mb-4">
                              <span className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium flex items-center">
                                <span className="mr-2">🏷️</span>
                                {request.category}
                              </span>
                              <span className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center ${getUrgencyColor(request.urgency)}`}>
                                <span className="mr-2">{getUrgencyIcon(request.urgency)}</span>
                                {request.urgency} Priority
                              </span>
                              <span className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm font-medium flex items-center">
                                <span className="mr-2">📊</span>
                                {request.quantity}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 leading-relaxed mb-4">{request.description}</p>
                            
                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
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
                          </div>
                        </div>

                        {request.notes && (
                          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                            <div className="flex items-start">
                              <span className="text-yellow-600 mr-3 mt-1">💡</span>
                              <div>
                                <p className="font-semibold text-yellow-800 mb-1">Admin Note</p>
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
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                  <span className="text-2xl">💡</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-blue-800 mb-4">How Product Requests Work</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 text-xl mx-auto mb-3 shadow-sm">
                        1
                      </div>
                      <h4 className="font-semibold text-blue-800 mb-2">Submit Request</h4>
                      <p className="text-blue-700 text-sm">Fill out the form with product details and requirements</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 text-xl mx-auto mb-3 shadow-sm">
                        2
                      </div>
                      <h4 className="font-semibold text-blue-800 mb-2">We Source</h4>
                      <p className="text-blue-700 text-sm">Our team searches for suppliers that match your needs</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 text-xl mx-auto mb-3 shadow-sm">
                        3
                      </div>
                      <h4 className="font-semibold text-blue-800 mb-2">Get Updates</h4>
                      <p className="text-blue-700 text-sm">Track your request status and receive notifications</p>
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