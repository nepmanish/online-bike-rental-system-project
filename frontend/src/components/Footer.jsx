// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaBicycle, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and description */}
          <div>
            <div className="flex items-center mb-4">
              <FaBicycle className="text-blue-500 text-3xl mr-2" />
              <span className="text-2xl font-bold">BikeRental</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your premier destination for high-quality bike rentals. 
              Explore the city with our diverse fleet of well-maintained bikes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b border-blue-500 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-500 transition flex items-center">
                  <span className="h-1 w-1 bg-blue-500 rounded-full mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/bikes" className="text-gray-400 hover:text-blue-500 transition flex items-center">
                  <span className="h-1 w-1 bg-blue-500 rounded-full mr-2"></span>
                  Browse Bikes
                </Link>
              </li>
              <li>
                <Link to="/recommendations" className="text-gray-400 hover:text-blue-500 transition flex items-center">
                  <span className="h-1 w-1 bg-blue-500 rounded-full mr-2"></span>
                  Recommendations
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="text-gray-400 hover:text-blue-500 transition flex items-center">
                  <span className="h-1 w-1 bg-blue-500 rounded-full mr-2"></span>
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-400 hover:text-blue-500 transition flex items-center">
                  <span className="h-1 w-1 bg-blue-500 rounded-full mr-2"></span>
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b border-blue-500 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-blue-500 mt-1 mr-3" />
                <span className="text-gray-400">butwal, Nepal</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-blue-500 mr-3" />
                <span className="text-gray-400">+977 9860587451</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-blue-500 mr-3" />
                <span className="text-gray-400">info@bikerental.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b border-blue-500 pb-2">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest offers and bike rental tips.
            </p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>
        
        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} BikeRental. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-blue-500 text-sm transition">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-blue-500 text-sm transition">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-blue-500 text-sm transition">FAQs</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;