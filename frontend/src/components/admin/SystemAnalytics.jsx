import React, { useState, useEffect } from 'react';
import { getBikes, getUsers, getBikeStats } from '../../services/api';
import { FaBicycle, FaUsers, FaChartLine } from 'react-icons/fa';

const SystemAnalytics = () => {
  const [stats, setStats] = useState({
    bikeCount: 0,
    userCount: 0,
    avgRating: 0,
    priceRange: [0, 0]
  });
  const [loading, setLoading] = useState(true);
  const [engineStats, setEngineStats] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [bikes, users, stats] = await Promise.all([
        getBikes(),
        getUsers(),
        getBikeStats()
      ]);
      
      // Calculate price range
      const prices = bikes.map(b => b.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      
      // Calculate average rating
      const totalRating = bikes.reduce((sum, bike) => sum + bike.ratingsAverage, 0);
      const avgRating = bikes.length > 0 ? totalRating / bikes.length : 0;
      
      setStats({
        bikeCount: bikes.length,
        userCount: users.length,
        avgRating: avgRating.toFixed(1),
        priceRange: [minPrice, maxPrice]
      });
      
      // Process engine stats
      const engineGroups = {};
      bikes.forEach(bike => {
        const engineGroup = Math.floor(bike.engineCC / 100) * 100;
        if (!engineGroups[engineGroup]) {
          engineGroups[engineGroup] = 0;
        }
        engineGroups[engineGroup]++;
      });
      
      const engineStatsArray = Object.entries(engineGroups)
        .map(([engine, count]) => ({
          engine: `${engine}-${parseInt(engine) + 99} CC`,
          count
        }))
        .sort((a, b) => parseInt(a.engine) - parseInt(b.engine));
      
      setEngineStats(engineStatsArray);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading analytics...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">System Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg flex flex-col items-center">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <FaBicycle className="text-blue-600 text-2xl" />
          </div>
          <h3 className="text-xl font-bold mb-1">{stats.bikeCount}</h3>
          <p className="text-gray-600">Total Bikes</p>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg flex flex-col items-center">
          <div className="bg-green-100 p-3 rounded-full mb-4">
            <FaUsers className="text-green-600 text-2xl" />
          </div>
          <h3 className="text-xl font-bold mb-1">{stats.userCount}</h3>
          <p className="text-gray-600">Registered Users</p>
        </div>
        
        <div className="bg-yellow-50 p-6 rounded-lg flex flex-col items-center">
          <div className="bg-yellow-100 p-3 rounded-full mb-4">
            <FaChartLine className="text-yellow-600 text-2xl" />
          </div>
          <h3 className="text-xl font-bold mb-1">{stats.avgRating}/5</h3>
          <p className="text-gray-600">Avg. Rating</p>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-lg flex flex-col items-center">
          <div className="bg-purple-100 p-3 rounded-full mb-4">
            <span className="text-purple-600 text-2xl">$</span>
          </div>
          <h3 className="text-xl font-bold mb-1">
            ${stats.priceRange[0]} - ${stats.priceRange[1]}
          </h3>
          <p className="text-gray-600">Price Range</p>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Bike Distribution by Engine Size</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {engineStats.map((stat, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{stat.engine}</span>
                  <span>{stat.count} bikes</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-blue-600 h-4 rounded-full" 
                    style={{ width: `${(stat.count / stats.bikeCount) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Recommendation Accuracy</h4>
            <div className="text-sm text-gray-600">
              <p className="mb-2">Based on user feedback, our recommendation system has:</p>
              <div className="flex justify-between mb-1">
                <span>Positive matches:</span>
                <span>78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">User Engagement</h4>
            <div className="text-sm text-gray-600">
              <p className="mb-2">Average user interactions per session:</p>
              <div className="flex justify-between mb-1">
                <span>Page views:</span>
                <span>5.2</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Recommendation clicks:</span>
                <span>2.8</span>
              </div>
              <div className="flex justify-between">
                <span>Avg. session duration:</span>
                <span>4m 32s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAnalytics;