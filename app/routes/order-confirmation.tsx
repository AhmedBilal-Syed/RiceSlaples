// app/routes/order-confirmation.tsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "~/Components/Footer";
import Header from "~/Components/Header";

export default function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Safe data extraction with defaults
  const getOrderData = () => {
    const orderFromState = location.state?.order;
    
    if (!orderFromState) {
      // Return mock data if no order data found
      return getMockOrderData();
    }

    // Validate and transform the incoming order data
    return {
      orderId: orderFromState.orderId || `ORD${Date.now()}`,
      orderDate: orderFromState.orderDate || new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: orderFromState.status || "Confirmed",
      total: Number(orderFromState.totals?.total) || Number(orderFromState.total) || 0,
      subtotal: Number(orderFromState.totals?.subtotal) || Number(orderFromState.subtotal) || 0,
      shipping: Number(orderFromState.totals?.shipping) || Number(orderFromState.shipping) || 0,
      tax: Number(orderFromState.totals?.tax) || Number(orderFromState.tax) || 0,
      paymentMethod: orderFromState.paymentInfo?.method || orderFromState.paymentMethod || "Credit Card",
      estimatedDelivery: orderFromState.estimatedDelivery || "January 22, 2024",
      items: Array.isArray(orderFromState.items) ? orderFromState.items.map((item: { id: any; name: any; size: any; brand: any; price: any; quantity: any; image: any; deliveryOption: any; selectedStore: any; }) => ({
        id: item.id || Math.random(),
        name: item.name || "Unknown Product",
        size: item.size || "Standard",
        brand: item.brand || "Vegist",
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
        image: item.image || "📦",
        deliveryOption: item.deliveryOption || "home",
        selectedStore: item.selectedStore || null
      })) : [],
      shippingAddress: orderFromState.shippingInfo || orderFromState.shippingAddress || {
        name: "Customer",
        street: "123 Main Street",
        city: "New York", 
        state: "NY",
        zipCode: "10001",
        country: "United States"
      }
    };
  };

  const getMockOrderData = () => {
    return {
      orderId: `ORD${Date.now()}`,
      orderDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: "Confirmed",
      total: 723.95,
      subtotal: 640.00,
      shipping: 15.00,
      tax: 68.95,
      paymentMethod: "Credit Card",
      estimatedDelivery: "January 22, 2024",
      items: [
        {
          id: 1,
          name: "Vegetable tomato fresh",
          size: "5kg",
          brand: "Petro demo",
          price: 384.51,
          quantity: 1,
          image: "🍅",
          deliveryOption: "home"
        },
        {
          id: 2,
          name: "Fresh healthy food", 
          size: "5kg",
          brand: "Multiwebinfo",
          price: 230.00,
          quantity: 1,
          image: "🥗",
          deliveryOption: "store",
          selectedStore: {
            name: "Vegist Main Store",
            address: "123 Main Street, Mumbai"
          }
        }
      ],
      shippingAddress: {
        name: "Andrew Louise",
        street: "123 Main Street",
        city: "New York", 
        state: "NY",
        zipCode: "10001",
        country: "United States"
      }
    };
  };

  const orderData = getOrderData();

  // Safe number formatting function
  const formatCurrency = (amount: number) => {
    const num = Number(amount);
    return isNaN(num) ? "$0.00" : `$${num.toFixed(2)}`;
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleTrackOrder = () => {
    navigate(`/order/${orderData.orderId}`);
  };

  const handlePrintConfirmation = () => {
    window.print();
  };

  // Calculate item total safely
  const getItemTotal = (item: { id?: React.Key | null | undefined; image?: string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; name?: string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; size?: string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; quantity: any; deliveryOption?: string; selectedStore?: { name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }; price?: any; }) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return price * quantity;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Order Confirmed!
              </h1>
              <p className="text-gray-600 text-lg">
                Thank you for your purchase. Your order has been received.
              </p>
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
                <p className="text-green-800 font-semibold">
                  Order #: <span className="font-mono">{orderData.orderId}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Order Summary */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
                  
                  {/* Items List */}
                  <div className="space-y-4 mb-6">
                    {orderData.items && orderData.items.length > 0 ? (
                      orderData.items.map((item: { id: React.Key | null | undefined; image: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; size: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; quantity: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; deliveryOption: string; selectedStore: { name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }; }) => (
                        <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center text-xl">
                              {item.image}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800">{item.name}</h3>
                              <p className="text-gray-600 text-sm">
                                Size: {item.size} • Qty: {item.quantity}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                {item.deliveryOption === 'store' ? (
                                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                    🏪 Store Pickup: {item.selectedStore?.name}
                                  </span>
                                ) : (
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                    🚚 Home Delivery
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-800">
                              {formatCurrency(getItemTotal(item))}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">No items in order</p>
                    )}
                  </div>

                  {/* Totals */}
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">{formatCurrency(orderData.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold">{formatCurrency(orderData.shipping)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-semibold">{formatCurrency(orderData.tax)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                      <span>Total</span>
                      <span className="text-green-600">{formatCurrency(orderData.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">What's Next?</h2>
                  
                  <div className="space-y-4">
                    {/* For Home Delivery */}
                    {orderData.items.some((item: { deliveryOption: string; }) => item.deliveryOption === 'home') && (
                      <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600">🚚</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-blue-800">Home Delivery</h3>
                          <p className="text-blue-700 text-sm">
                            Your items will be delivered to your address by <strong>{orderData.estimatedDelivery}</strong>. 
                            You'll receive tracking information via email.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* For Store Pickup */}
                    {orderData.items.some((item: { deliveryOption: string; }) => item.deliveryOption === 'store') && (
                      <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600">🏪</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-green-800">Store Pickup</h3>
                          <p className="text-green-700 text-sm">
                            Your items are reserved for pickup. Please visit the selected stores with your order confirmation.
                            Remember to bring your ID for verification.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Payment Confirmation */}
                    <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-600">💳</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-purple-800">Payment Confirmed</h3>
                        <p className="text-purple-700 text-sm">
                          Payment method: <strong>{orderData.paymentMethod}</strong>. 
                          A receipt has been sent to your email.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                
                {/* Order Details */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Order Details</h2>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-600">Order Number:</span>
                      <p className="font-semibold">{orderData.orderId}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Order Date:</span>
                      <p className="font-semibold">{orderData.orderDate}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <p className="font-semibold text-green-600">{orderData.status}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Email Confirmation:</span>
                      <p className="font-semibold">Sent</p>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Address</h2>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p className="font-semibold text-gray-800">{orderData.shippingAddress.name}</p>
                    <p>{orderData.shippingAddress.street}</p>
                    <p>{orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zipCode}</p>
                    <p>{orderData.shippingAddress.country}</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <button
                      onClick={handleTrackOrder}
                      className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      📱 Track Your Order
                    </button>
                    <button
                      onClick={handlePrintConfirmation}
                      className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      🖨️ Print Confirmation
                    </button>
                    <button
                      onClick={handleContinueShopping}
                      className="w-full border border-green-600 text-green-600 py-3 rounded-lg hover:bg-green-50 transition-colors font-medium"
                    >
                      🛒 Continue Shopping
                    </button>
                  </div>
                </div>

                {/* Support */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Need Help?</h3>
                  <p className="text-blue-700 text-sm mb-3">
                    Our customer service team is here to help with any questions.
                  </p>
                  <div className="space-y-1 text-sm text-blue-600">
                    <p>📞 1-800-VEGIST</p>
                    <p>✉️ support@vegist.com</p>
                    <p>🕒 24/7 Support</p>
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
}