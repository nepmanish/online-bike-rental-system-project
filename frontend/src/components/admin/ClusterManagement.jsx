import React, { useState, useEffect } from 'react';
import { reclusterBikes, getCentroids } from '../../services/api';
import { FaSync, FaChartBar } from 'react-icons/fa';

const ClusterManagement = () => {
  const [centroids, setCentroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reclustering, setReclustering] = useState(false);
  const [kValue, setKValue] = useState(3);

  useEffect(() => {
    fetchCentroids();
  }, []);

  const fetchCentroids = async () => {
    setLoading(true);
    try {
      const response = await getCentroids();
      // Filter out the normalization centroid (clusterId: -1)
      const filteredCentroids = response.data.filter(c => c.clusterId >= 0);
      setCentroids(filteredCentroids);
    } catch (error) {
      console.error('Error fetching centroids:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecluster = async () => {
    setReclustering(true);
    try {
      await reclusterBikes(kValue);
      fetchCentroids();
    } catch (error) {
      console.error('Error reclustering bikes:', error);
    } finally {
      setReclustering(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading clusters...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Cluster Management</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <label className="mr-2">Clusters:</label>
            <input
              type="number"
              min="2"
              max="10"
              value={kValue}
              onChange={(e) => setKValue(Number(e.target.value))}
              className="w-16 p-2 border rounded"
            />
          </div>
          <button
            onClick={handleRecluster}
            disabled={reclustering}
            className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center ${
              reclustering ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FaSync className={`mr-2 ${reclustering ? 'animate-spin' : ''}`} />
            {reclustering ? 'Reclustering...' : 'Recluster Bikes'}
          </button>
        </div>
      </div>

      <div className="mb-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <FaChartBar className="mr-2" /> Cluster Summary
        </h3>
        <p className="text-sm">
          The system has grouped bikes into {centroids.length} clusters based on price, engine size, and weight.
          Each cluster represents a distinct group of bikes with similar characteristics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {centroids.map(centroid => (
          <div key={centroid.clusterId} className="border rounded-lg p-4 bg-gray-50">
            <h3 className="text-xl font-bold mb-3 text-center">
              Cluster {centroid.clusterId + 1}
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Average Price:</span>
                <span>${centroid.rawVector[0].toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium">Engine Size:</span>
                <span>{centroid.rawVector[1].toFixed(0)} CC</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium">Weight:</span>
                <span>{centroid.rawVector[2].toFixed(0)} kg</span>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">Characteristics:</h4>
              <p className="text-sm">
                {centroid.rawVector[0] < 2000 ? 'Budget-friendly' : 'Premium'} bikes with{' '}
                {centroid.rawVector[1] < 200 ? 'small' : 'large'} engines, suitable for{' '}
                {centroid.rawVector[2] < 150 ? 'city commuting' : 'long-distance touring'}.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClusterManagement;