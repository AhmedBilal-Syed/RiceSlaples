// app/routes/order.$orderId.tsx
import React from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "~/Components/Footer";
import Header from "~/Components/Header";

export default function OrderDetailPage() {
  const { orderId } = useParams();

  // Mock order data - in real app, fetch based on orderId
  const order = {
    id: orderId || "#12345",
    date: "January 15, 2024",
    status: "Delivered",
    total: 384.51,
    subtotal: 350.00,
    shipping: 24.51,
    tax: 10.00,
    paymentMethod: "Credit Card (**** 4242)",
    shippingAddress: {
      name: "Andrew Louise",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States"
    },
    billingAddress: {
      name: "Andrew Louise",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States"
    },
    items: [
      {
        id: 1,
        name: "Vegetable tomato fresh",
        size: "5kg",
        brand: "Petro demo",
        price: 384.51,
        quantity: 1,
        image: "🍅"
      },
      {
        id: 2,
        name: "Fresh healthy food",
        size: "5kg",
        brand: "Multiwebinfo",
        price: 230.00,
        quantity: 1,
        image: "🥗"
      }
    ],
    tracking: [
      { date: "2024-01-15 10:00", status: "Order Placed", description: "Your order has been confirmed" },
      { date: "2024-01-16 14:30", status: "Processing", description: "Your order is being prepared" },
      { date: "2024-01-17 09:15", status: "Shipped", description: "Your order has been shipped" },
      { date: "2024-01-19 16:45", status: "Delivered", description: "Your order has been delivered" }
    ]
  };

  // Dynamic page title
  React.useEffect(() => {
    document.title = `Order ${order.id} - Vegist`;
  }, [order.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-[#b91d08]/10 text-[#b91d08]';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return '✅';
      case 'Processing': return '🔄';
      case 'Shipped': return '🚚';
      case 'Cancelled': return '❌';
      default: return '📦';
    }
  };

  return (
    
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header/>
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Dynamic Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Order #{order.id}
                </h1>
                <p className="text-gray-700 mt-2">Placed on {order.date}</p>
              </div>
              <Link
                to="/account"
                className="inline-flex items-center text-[#b91d08] hover:text-[#9e1807] font-bold mt-4 sm:mt-0"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Account
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Order Status */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Order Status</h2>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)} {order.status}
                    </span>
                  </div>
                  
                  {/* Tracking Timeline */}
                  <div className="space-y-6">
                    {order.tracking.map((step, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          index <= order.tracking.findIndex(s => s.status === order.status) 
                            ? 'bg-[#b91d08] text-white' 
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          {getStatusIcon(step.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                            <h3 className="font-bold text-gray-900 text-lg">{step.status}</h3>
                            <span className="text-sm text-gray-600 mt-1 sm:mt-0">{step.date}</span>
                          </div>
                          <p className="text-gray-700 mt-1">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Order Items</h2>
                  <div className="space-y-6">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                            {item.image}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                            <p className="text-gray-700 text-sm">Size: {item.size}</p>
                            <p className="text-gray-700 text-sm">Brand: {item.brand}</p>
                            <p className="text-gray-700 text-sm">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900 text-xl">${item.price.toFixed(2)}</p>
                          <p className="text-gray-700 text-sm">${(item.price * item.quantity).toFixed(2)} total</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Order Summary */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Subtotal</span>
                      <span className="font-bold text-gray-900">${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Shipping</span>
                      <span className="font-bold text-gray-900">${order.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Tax</span>
                      <span className="font-bold text-gray-900">${order.tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-gray-900">Total</span>
                        <span className="text-[#b91d08]">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Address</h2>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p className="font-bold text-gray-900">{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.street}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
                  <p className="text-gray-700">{order.paymentMethod}</p>
                </div>

                {/* Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Order Actions</h2>
                  <div className="space-y-3">
                    <button className="w-full bg-[#b91d08] hover:bg-[#9e1807] text-white py-3 rounded-lg transition-colors font-bold">
                      📄 Download Invoice
                    </button>
                    <button className="w-full border border-[#b91d08] text-[#b91d08] py-3 rounded-lg hover:bg-[#b91d08]/5 transition-colors font-bold">
                      🔄 Reorder Items
                    </button>
                    <button className="w-full border border-red-300 text-red-600 py-3 rounded-lg hover:bg-red-50 transition-colors font-bold">
                      🚩 Report Problem
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}