import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import heroImage from '../assets/img.jpg';

const HomePage = () => {
  const { currentUser } = useAuth();

  return (  
    <div className="relative">
      {/* Hero Section */}
      <div className=" text-gray-800 flex flex-col items-center justify-center h-140 bg-cover  " style={{
          backgroundImage:`url(${heroImage})`,
        }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Perfect Ride</h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Discover the best bikes for your adventure with our personalized recommendations
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {currentUser ? (
              <>
                {currentUser.preferences ? (
                  <Link 
                    to="/recommendations" 
                    className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-100 transition"
                  >
                    Get Recommendations
                  </Link>
                ) : (
                  <Link 
                    to="/preferences" 
                    className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-100 transition"
                  >
                    Set Your Preferences
                  </Link>
                )}
                <Link 
                  to="/new-booking" 
                  className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-700 transition"
                >
                  Book Now
                </Link>
              </>
            ) : (
              <Link 
                to="/signup" 
                className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-100 transition"
              >
                Join Now
              </Link>
            )}
            <Link 
              to="/bikes" 
              className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-900 transition"
            >
              Browse Bikes
            </Link>
          </div>
        </div>
        
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Personalized Recommendations",
                description: "Get bike suggestions tailored to your preferences and riding style",
                icon: "🔍"
              },
              {
                title: "Wide Selection",
                description: "Choose from various bikes ranging from commuters to adventure tourers",
                icon: "🚴"
              },
              {
                title: "Easy Booking",
                description: "Simple and quick rental process with secure payment options",
                icon: "📱"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;