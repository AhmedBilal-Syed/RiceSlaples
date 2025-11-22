// app/routes/checkout.tsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "~/Components/Header";
import Footer from "~/Components/Footer";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get items from either cart or buy-now
  const [checkoutItems, setCheckoutItems] = useState(() => {
    if (location.state?.items) {
      return location.state.items;
    }
    if (location.state?.buyNowItem) {
      return [location.state.buyNowItem];
    }
    return [];
  });

  const [checkoutStep, setCheckoutStep] = useState('shipping');
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Canada'
  });
  const [paymentInfo, setPaymentInfo] = useState({
    method: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  // Store locations for pickup
  const storeLocations = [
    {
      id: "store-1",
      name: "Vegist Main Store",
      address: "123 Main Street, Andheri West",
      city: "Mumbai",
      distance: "2.5 km"
    },
    {
      id: "store-2", 
      name: "Vegist Downtown",
      address: "456 Downtown Avenue, Connaught Place",
      city: "Delhi",
      distance: "1.8 km"
    },
    {
      id: "store-3",
      name: "Vegist Premium", 
      address: "789 Luxury Road, Koramangala",
      city: "Bangalore",
      distance: "3.2 km"
    }
  ];

  // Calculate totals
  const subtotal = checkoutItems.reduce((total: number, item: { price: number; quantity: number; }) => total + (item.price * item.quantity), 0);
  const shipping = checkoutItems.some((item: { deliveryOption: string; }) => item.deliveryOption === 'home') ? 15.00 : 0;
  const tax = subtotal * 0.13;
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('review');
  };

  const placeOrder = () => {
    const orderData = {
      items: checkoutItems,
      shippingInfo,
      paymentInfo,
      totals: {
        subtotal,
        shipping,
        tax,
        total
      },
      orderId: `ORD${Date.now()}`,
      orderDate: new Date().toISOString(),
      status: "Confirmed",
      source: location.state?.source || 'checkout'
    };

    console.log('Order placed:', orderData);
    
    // Navigate to confirmation page
    navigate('/order-confirmation', { state: { order: orderData } });
  };

  const updateDeliveryOption = (itemId: number | string, option: 'home' | 'store') => {
    setCheckoutItems((items: any[]) =>
      items.map(item =>
        item.id === itemId ? { 
          ...item, 
          deliveryOption: option,
          selectedStore: option === 'store' ? storeLocations[0] : null
        } : item
      )
    );
  };

  const updateSelectedStore = (itemId: number | string, store: StoreLocation) => {
    setCheckoutItems((items: any[]) =>
      items.map(item =>
        item.id === itemId ? { ...item, selectedStore: store } : item
      )
    );
  };

  const updateQuantity = (itemId: number | string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCheckoutItems((items: any[]) =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId: number | string) => {
    setCheckoutItems((items: any[]) => items.filter(item => item.id !== itemId));
    
    // If no items left, go back to appropriate page
    if (checkoutItems.length === 1) {
      navigate('/cart');
    }
  };

  // If no items, redirect to cart
  if (checkoutItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Checkout Progress */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-center py-4">
            <div className="flex items-center space-x-8">
              {['shipping', 'payment', 'review'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    checkoutStep === step 
                      ? 'bg-green-600 text-white' 
                      : index < ['shipping', 'payment', 'review'].indexOf(checkoutStep)
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`ml-2 font-medium ${
                    checkoutStep === step ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.charAt(0).toUpperCase() + step.slice(1)}
                  </span>
                  {index < 2 && (
                    <div className="w-12 h-0.5 bg-gray-300 mx-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Content */}
      <div className="container mx-auto px-4 py-8">
        {checkoutStep === 'shipping' ? (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Shipping Information</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Shipping Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleShippingSubmit} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State/Province *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP/Postal Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => navigate('/cart')}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                    >
                      ← Back to Cart
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                    >
                      Continue to Payment →
                    </button>
                  </div>
                </form>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <OrderSummarySidebar 
                  items={checkoutItems} 
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  total={total}
                  onUpdateDeliveryOption={updateDeliveryOption}
                  onUpdateSelectedStore={updateSelectedStore}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeItem}
                  storeLocations={storeLocations}
                />
              </div>
            </div>
          </div>
        ) : checkoutStep === 'payment' ? (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Payment Method</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Payment Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handlePaymentSubmit} className="bg-white rounded-lg shadow-sm p-6">
                  {/* Payment Method Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Payment Method
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {[
                        { value: 'card', label: '💳 Credit Card', icon: '💳' },
                        { value: 'paypal', label: 'PayPal', icon: '🔵' },
                        { value: 'store', label: '🏪 Pay at Store', icon: '🏪' }
                      ].map(method => (
                        <label
                          key={method.value}
                          className={`flex items-center p-3 border-2 rounded-lg cursor-pointer ${
                            paymentInfo.method === method.value
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-300 hover:border-green-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.value}
                            checked={paymentInfo.method === method.value}
                            onChange={(e) => setPaymentInfo({...paymentInfo, method: e.target.value})}
                            className="text-green-600 focus:ring-green-500"
                          />
                          <span className="ml-2 text-sm font-medium">{method.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Card Details */}
                  {paymentInfo.method === 'card' && (
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={paymentInfo.cardNumber}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={paymentInfo.expiryDate}
                            onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV *
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            value={paymentInfo.cvv}
                            onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={paymentInfo.nameOnCard}
                          onChange={(e) => setPaymentInfo({...paymentInfo, nameOnCard: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Pay at Store Notice */}
                  {paymentInfo.method === 'store' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-yellow-800 mb-2">Pay at Store Instructions</h4>
                      <p className="text-sm text-yellow-700">
                        Your items will be reserved for pickup. Please visit the selected stores to complete your payment and collect your orders.
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('shipping')}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                    >
                      ← Back to Shipping
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                    >
                      Review Order →
                    </button>
                  </div>
                </form>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <OrderSummarySidebar 
                  items={checkoutItems} 
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  total={total}
                  onUpdateDeliveryOption={updateDeliveryOption}
                  onUpdateSelectedStore={updateSelectedStore}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeItem}
                  storeLocations={storeLocations}
                />
              </div>
            </div>
          </div>
        ) : checkoutStep === 'review' ? (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Review Your Order</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Review */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Order Items</h3>
                  {checkoutItems.map((item: CartItem) => (
                    <div key={item.id} className="flex justify-between items-center border-b border-gray-100 py-4 last:border-b-0">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                          {item.image}
                        </div>
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            {item.deliveryOption === 'home' ? '🚚 Home Delivery' : '🏪 Store Pickup'}
                            {item.selectedStore && ` • ${item.selectedStore.name}`}
                          </p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-4">Shipping & Payment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Shipping Address</h4>
                      <p className="text-sm text-gray-600">
                        {shippingInfo.firstName} {shippingInfo.lastName}<br/>
                        {shippingInfo.address}<br/>
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}<br/>
                        {shippingInfo.country}<br/>
                        📞 {shippingInfo.phone}<br/>
                        📧 {shippingInfo.email}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Payment Method</h4>
                      <p className="text-sm text-gray-600">
                        {paymentInfo.method === 'card' && '💳 Credit Card'}
                        {paymentInfo.method === 'paypal' && '🔵 PayPal'}
                        {paymentInfo.method === 'store' && '🏪 Pay at Store'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary & Place Order */}
              <div className="lg:col-span-1">
                <OrderSummarySidebar 
                  items={checkoutItems} 
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  total={total}
                  showActions={false}
                />
                <button
                  onClick={placeOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg mt-4"
                >
                  Place Order
                </button>
                <button
                  onClick={() => setCheckoutStep('payment')}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 font-medium mt-3"
                >
                  ← Back to Payment
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
}

// Order Summary Sidebar Component
type StoreLocation = {
  id: string;
  name: string;
  address?: string;
  city?: string;
  distance?: string;
};

type CartItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  deliveryOption?: 'home' | 'store';
  selectedStore?: StoreLocation | null;
  image?: React.ReactNode;
};

type OrderSummaryProps = {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  onUpdateDeliveryOption?: (itemId: number | string, option: 'home' | 'store') => void;
  onUpdateSelectedStore?: (itemId: number | string, store: StoreLocation) => void;
  onUpdateQuantity?: (itemId: number | string, newQuantity: number) => void;
  onRemoveItem?: (itemId: number | string) => void;
  storeLocations?: StoreLocation[];
  showActions?: boolean;
};

const OrderSummarySidebar: React.FC<OrderSummaryProps> = ({ 
  items, 
  subtotal, 
  shipping, 
  tax, 
  total, 
  onUpdateDeliveryOption,
  onUpdateSelectedStore,
  onUpdateQuantity,
  onRemoveItem,
  storeLocations = [],
  showActions = true 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      
      {/* Items List */}
      {showActions && (
        <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
          {items.map(item => (
            <div key={item.id} className="border-b border-gray-100 pb-3 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                  <p className="text-green-600 font-semibold text-sm">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => onUpdateQuantity?.(item.id, item.quantity - 1)}
                    className="w-6 h-6 flex items-center justify-center text-xs border rounded"
                  >
                    -
                  </button>
                  <button 
                    onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center text-xs border rounded"
                  >
                    +
                  </button>
                  <button 
                    onClick={() => onRemoveItem?.(item.id)}
                    className="w-6 h-6 flex items-center justify-center text-xs border border-red-300 text-red-600 rounded"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              {/* Delivery Options */}
              <div className="space-y-2 mt-2">
                <div className="flex space-x-1">
                  <button
                    onClick={() => onUpdateDeliveryOption?.(item.id, 'home')}
                    className={`flex-1 px-2 py-1 text-xs rounded border ${
                      item.deliveryOption === 'home' 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-white text-gray-700 border-gray-300'
                    }`}
                  >
                    🚚 Home
                  </button>
                  <button
                    onClick={() => onUpdateDeliveryOption?.(item.id, 'store')}
                    className={`flex-1 px-2 py-1 text-xs rounded border ${
                      item.deliveryOption === 'store' 
                        ? 'bg-green-600 text-white border-green-600' 
                        : 'bg-white text-gray-700 border-gray-300'
                    }`}
                  >
                    🏪 Store
                  </button>
                </div>

                {item.deliveryOption === 'store' && (
                  <select
                    value={item.selectedStore?.id || ''}
                    onChange={(e) => {
                      const store = storeLocations.find(s => s.id === e.target.value);
                      if (store) onUpdateSelectedStore?.(item.id, store);
                    }}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                  >
                    {storeLocations.map((store: { id: string; name: string }) => (
                      <option key={store.id} value={store.id}>
                        {store.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Totals */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax (13%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-3">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};