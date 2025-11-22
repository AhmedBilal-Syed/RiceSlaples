// app/routes/reservation-confirmation.tsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function ReservationConfirmation() {
  const location = useLocation();
  const reservation = location.state?.reservation;

  if (!reservation) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Reservation Not Found</h1>
          <Link to="/" className="text-green-600 hover:text-green-700">
            Return to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Reservation Confirmed!
            </h1>
            
            <p className="text-gray-600 mb-6">
              Your product has been reserved for pickup. Please visit the store to complete your payment and collect your order.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Reservation Details</h3>
                  <p className="text-sm text-gray-600">
                    <strong>Reservation ID:</strong> {reservation.reservationId}<br/>
                    <strong>Product:</strong> {reservation.product}<br/>
                    <strong>Variant:</strong> {reservation.variant.brand} - {reservation.variant.grainType}<br/>
                    <strong>Weight:</strong> {reservation.variant.weight}<br/>
                    <strong>Quantity:</strong> {reservation.quantity}<br/>
                    <strong>Total Amount:</strong> {reservation.price}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Pickup Store</h3>
                  <p className="text-sm text-gray-600">
                    <strong>Store:</strong> {reservation.selectedStore.name}<br/>
                    <strong>Address:</strong> {reservation.selectedStore.address}<br/>
                    <strong>City:</strong> {reservation.selectedStore.city}<br/>
                    <strong>Phone:</strong> {reservation.selectedStore.phone}<br/>
                    <strong>Timing:</strong> {reservation.selectedStore.timing}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-yellow-800 mb-2">📋 What to do next?</h4>
              <ol className="text-sm text-yellow-700 text-left space-y-2">
                <li>1. Visit the selected store with your Reservation ID</li>
                <li>2. Show the reservation confirmation to store staff</li>
                <li>3. Pay the amount at the store counter</li>
                <li>4. Collect your product</li>
              </ol>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Continue Shopping
              </Link>
              <button
                onClick={() => window.print()}
                className="bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg border border-gray-300 transition-colors"
              >
                Print Confirmation
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}