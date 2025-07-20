import React, { useEffect, useState } from 'react';
import BikeCard from '../components/BikeCard';
import { getBikes } from '../services/api';

const BikesPage = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minCC: '',
    maxCC: ''
  });

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        setLoading(true);
        const data = await getBikes();
        setBikes(data);
      } catch (err) {
        setError('Failed to load bikes. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  const filteredBikes = bikes.filter(bike => {
    return (
      (filters.minPrice === '' || bike.price >= Number(filters.minPrice)) &&
      (filters.maxPrice === '' || bike.price <= Number(filters.maxPrice)) &&
      (filters.minCC === '' || bike.engineCC >= Number(filters.minCC)) &&
      (filters.maxCC === '' || bike.engineCC <= Number(filters.maxCC))
    );
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading bikes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Our Bike Collection</h1>
      
      {/* Filter Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Filter Bikes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Min Price (NRs)</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
              placeholder="Min"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Max Price (NRs)</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
              placeholder="Max"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Min Engine (CC)</label>
            <input
              type="number"
              name="minCC"
              value={filters.minCC}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
              placeholder="Min"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Max Engine (CC)</label>
            <input
              type="number"
              name="maxCC"
              value={filters.maxCC}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {/* Bikes Grid */}
      {filteredBikes.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No bikes found</h3>
          <p className="text-gray-600">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBikes.map(bike => (
            <BikeCard key={bike._id} bike={bike} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BikesPage;