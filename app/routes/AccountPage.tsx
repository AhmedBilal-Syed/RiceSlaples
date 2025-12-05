// AccountPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "~/Components/Footer";
import Header from "~/Components/Header";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState({
    firstName: "Andrew",
    lastName: "Louise",
    email: "andrew.louise@example.com",
    phone: "+1 (555) 123-4567",
    newPassword: "",
    confirmPassword: "",
    newsletter: true
  });

  const [orders] = useState([
    { id: "12345", date: "2024-01-15", total: 384.51, status: "Delivered" },
    { id: "12346", date: "2024-01-10", total: 230.00, status: "Processing" },
    { id: "12347", date: "2024-01-05", total: 109.20, status: "Delivered" },
    { id: "12348", date: "2024-01-02", total: 460.00, status: "Cancelled" },
    { id: "12349", date: "2023-12-28", total: 299.99, status: "Delivered" }
  ]);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      name: "Andrew Louise",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      isDefault: true
    },
    {
      id: 2,
      type: "Work",
      name: "Andrew Louise",
      street: "456 Business Ave",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "United States",
      isDefault: false
    }
  ]);

  const [newAddress, setNewAddress] = useState({
    type: "Home",
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States"
  });

  const [showAddAddress, setShowAddAddress] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressInputChange = (field: string, value: string) => {
    setNewAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving profile:", userData);
    alert("Profile updated successfully!");
  };

  const setDefaultAddress = (id: number) => {
    setAddresses(addrs => 
      addrs.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    );
  };

  const deleteAddress = (id: number) => {
    if (addresses.length <= 1) {
      alert("You must have at least one address");
      return;
    }
    setAddresses(addrs => addrs.filter(addr => addr.id !== id));
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddr = {
      ...newAddress,
      id: Date.now(),
      isDefault: addresses.length === 0
    };
    setAddresses(prev => [...prev, newAddr]);
    setNewAddress({
      type: "Home",
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States"
    });
    setShowAddAddress(false);
    alert("Address added successfully!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return ' text-[#cf5923]';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "orders":
        return (
          <div className="bg-white rounded-lg shadow-sm border border-[#fcf6ed] p-6">
            <h2 className="text-2xl font-bold text-[#cf5923] mb-6">Order History</h2>

            {orders.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-600 text-lg mb-4">You haven't placed any orders yet</p>
                <Link
                  to="/products"
                  className="inline-block bg-[#cf5923] text-white px-6 py-3 rounded-lg hover:bg-[#b84e1f] transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-[#fcf6ed] rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div className="mb-3 sm:mb-0">
                        <h3 className="font-semibold text-[#cf5923] text-lg">Order #{order.id}</h3>
                        <p className="text-gray-600 text-sm">Placed on {order.date}</p>
                      </div>

                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-xl font-bold text-[#cf5923] mb-2 sm:mb-0">${order.total.toFixed(2)}</span>

                      <Link
                        to={`/order/${order.id}`}
                        className="bg-[#cf5923] text-white px-6 py-2 rounded-lg hover:bg-[#b84e1f] transition-colors font-medium text-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "address":
        return (
          <div className="bg-white rounded-lg shadow-sm border border-[#fcf6ed] p-6">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#cf5923]">Saved Addresses</h2>

              <button 
                onClick={() => setShowAddAddress(true)}
                className="bg-[#cf5923] text-white px-6 py-3 rounded-lg hover:bg-[#b84e1f] transition-colors font-medium"
              >
                Add New Address
              </button>
            </div>

            {showAddAddress && (
              <div className="bg-[#fcf6ed] rounded-lg p-6 mb-6 border border-[#cf5923]">
                <h3 className="text-xl font-bold text-[#cf5923] mb-4">Add New Address</h3>
                
                <form onSubmit={handleAddAddress} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm font-medium text-[#cf5923] mb-2">Address Type</label>
                    <select
                      value={newAddress.type}
                      onChange={(e) => handleAddressInputChange('type', e.target.value)}
                      className="w-full border border-[#cf5923] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#cf5923] focus:border-transparent bg-white"
                    >
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#cf5923] mb-2">Full Name</label>
                    <input
                      type="text"
                      value={newAddress.name}
                      onChange={(e) => handleAddressInputChange('name', e.target.value)}
                      className="w-full border border-[#cf5923] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#cf5923] bg-white"
                      placeholder="Full Name"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#cf5923] mb-2">Street Address</label>
                    <input
                      type="text"
                      value={newAddress.street}
                      onChange={(e) => handleAddressInputChange('street', e.target.value)}
                      className="w-full border border-[#cf5923] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#cf5923] bg-white"
                      placeholder="Street Address"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#cf5923] mb-2">City</label>
                    <input
                      type="text"
                      value={newAddress.city}
                      onChange={(e) => handleAddressInputChange('city', e.target.value)}
                      className="w-full border border-[#cf5923] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#cf5923] bg-white"
                      placeholder="City"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#cf5923] mb-2">State</label>
                    <input
                      type="text"
                      value={newAddress.state}
                      onChange={(e) => handleAddressInputChange('state', e.target.value)}
                      className="w-full border border-[#cf5923] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#cf5923]"
                      placeholder="State"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#cf5923] mb-2">ZIP Code</label>
                    <input
                      type="text"
                      value={newAddress.zipCode}
                      onChange={(e) => handleAddressInputChange('zipCode', e.target.value)}
                      className="w-full border border-[#cf5923] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#cf5923]"
                      placeholder="ZIP Code"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#cf5923] mb-2">Country</label>
                    <input
                      type="text"
                      value={newAddress.country}
                      onChange={(e) => handleAddressInputChange('country', e.target.value)}
                      className="w-full border border-[#cf5923] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#cf5923]"
                      placeholder="Country"
                      required
                    />
                  </div>

                  <div className="md:col-span-2 flex gap-4">
                    <button
                      type="submit"
                      className="bg-[#cf5923] text-white px-6 py-3 rounded-lg hover:bg-[#b84e1f] transition-colors font-medium"
                    >
                      Save Address
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddAddress(false)}
                      className="border border-[#cf5923] text-[#cf5923] px-6 py-3 rounded-lg hover:bg-[#fcf6ed] transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {addresses.map((address) => (
                <div 
                  key={address.id} 
                  className={`border-2 rounded-lg p-6 ${
                    address.isDefault 
                      ? 'border-[#cf5923] bg-[#fcf6ed]' 
                      : 'border-[#fcf6ed]'
                  }`}
                >

                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                      <span className="inline-block bg-[#fcf6ed] text-[#cf5923] px-3 py-1 rounded text-sm font-medium">
                        {address.type}
                      </span>

                      {address.isDefault && (
                        <span className="inline-block bg-[#cf5923] text-white px-3 py-1 rounded text-sm font-medium">
                          Default
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 text-gray-600">
                    <p className="font-semibold text-[#cf5923] text-lg">{address.name}</p>
                    <p>{address.street}</p>
                    <p>{address.city}, {address.state} {address.zipCode}</p>
                    <p>{address.country}</p>
                  </div>

                  <div className="flex gap-4 mt-6">

                    {!address.isDefault && (
                      <button 
                        onClick={() => setDefaultAddress(address.id)}
                        className="text-[#cf5923] hover:text-[#b84e1f] font-medium text-sm"
                      >
                        Set as Default
                      </button>
                    )}

                    <button 
                      onClick={() => deleteAddress(address.id)}
                      className="text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      Delete
                    </button>

                  </div>
                </div>
              ))}
            </div>

          </div>
        );

      case "wishlist":
        return (
          <div className="bg-white rounded-lg shadow-sm border border-[#fcf6ed] p-6">
            <h2 className="text-2xl font-bold text-[#cf5923] mb-6">My Wishlist</h2>

            <div className="text-center py-12">
              <div className="text-6xl mb-4">❤️</div>
              <p className="text-gray-600 text-lg mb-4">You have 3 items in your wishlist</p>

              <Link
                to="/wishlist"
                className="inline-block bg-[#cf5923] text-white px-8 py-4 rounded-lg hover:bg-[#b84e1f] transition-colors font-medium text-lg"
              >
                View Wishlist
              </Link>
            </div>
          </div>
        );

      default: // PROFILE TAB
        return (
          <form onSubmit={handleSaveProfile} className="bg-white rounded-lg shadow-sm border border-[#fcf6ed] p-6">
            <h2 className="text-2xl font-bold text-[#cf5923] mb-6">Profile Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block text-sm font-medium text-[#cf5923] mb-2">
                  First name
                </label>
                <input
                  type="text"
                  value={userData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full border border-[#cf5923] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#cf5923] bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#cf5923] mb-2">
                  Last name
                </label>
                <input
                  type="text"
                  value={userData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full border border-[#cf5923] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#cf5923] bg-white"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#cf5923] mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full border border-[#cf5923] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#cf5923] bg-white"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#cf5923] mb-2">
                  Phone number
                </label>
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full border border-[#cf5923] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#cf5923] bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#cf5923] mb-2">
                  New password
                </label>
                <input
                  type="password"
                  value={userData.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  className="w-full border border-[#cf5923] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#cf5923] bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#cf5923] mb-2">
                  Confirm password
                </label>
                <input
                  type="password"
                  value={userData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full border border-[#cf5923] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#cf5923] bg-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={userData.newsletter}
                    onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                    className="w-5 h-5 text-[#cf5923] border-[#cf5923] rounded focus:ring-[#cf5923]"
                  />
                  <span className="text-sm text-[#cf5923]">Subscribe me to newsletter</span>
                </label>
              </div>

            </div>

            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="bg-[#cf5923] text-white px-8 py-3 rounded-lg hover:bg-[#b84e1f] transition-colors font-medium"
              >
                Save Changes
              </button>
            </div>

          </form>
        );
    }
  };

  return (
    <div className="min-h-screen  flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-[#fcf6ed] p-6 sticky top-8">

                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-[#cf5923] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      {userData.firstName[0]}{userData.lastName[0]}
                    </div>

                    <h2 className="text-xl font-bold text-[#cf5923]">
                      {userData.firstName} {userData.lastName}
                    </h2>
                    
                    <p className="text-gray-600 text-sm mt-1">Joined April 06, 2021</p>
                  </div>

                  <nav className="space-y-2">
                    {[
                      { id: "profile", label: "Profile", count: null, icon: "👤" },
                      { id: "orders", label: "Orders", count: orders.length, icon: "📦" },
                      { id: "address", label: "Address", count: addresses.length, icon: "📍" },
                      { id: "wishlist", label: "Wishlist", count: 3, icon: "❤️" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-[#fcf6ed] text-[#cf5923] border-2 border-[#cf5923]'
                            : 'text-[#cf5923] hover:bg-[#fcf6ed] border-2 border-transparent'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{tab.icon}</span>
                          <span className="font-medium">{tab.label}</span>
                        </div>

                        {tab.count !== null && (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              activeTab === tab.id
                                ? 'bg-[#cf5923] text-white'
                                : 'bg-[#fcf6ed] text-[#cf5923]'
                            }`}
                          >
                            {tab.count}
                          </span>
                        )}
                      </button>
                    ))}
                  </nav>

                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                {renderTabContent()}
              </div>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccountPage;
