import React, { useState, useEffect } from 'react';
import { getBikes,createBike, updateBike, deleteBike } from '../../services/api';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const BikeManagement = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentBike, setCurrentBike] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    engineCC: '',
    weight: '',
    price: '',
    summary: '',
    description: '',
    imageCover: ''
  });

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    setLoading(true);
    try {
      const data = await getBikes();
      setBikes(data);
    } catch (error) {
      console.error('Error fetching bikes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentBike) {
        await updateBike(currentBike._id, formData);
      } else {
        await createBike(formData);
      }
      setShowForm(false);
      setCurrentBike(null);
      fetchBikes();
    } catch (error) {
      console.error('Error saving bike:', error);
    }
  };

  const handleEdit = (bike) => {
    setCurrentBike(bike);
    setFormData({
      name: bike.name,
      engineCC: bike.engineCC,
      weight: bike.weight,
      price: bike.price,
      summary: bike.summary,
      description: bike.description,
      imageCover: bike.imageCover
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bike?')) {
      try {
        await deleteBike(id);
        fetchBikes();
      } catch (error) {
        console.error('Error deleting bike:', error);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading bikes...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Bike Management</h2>
        <button 
          onClick={() => {
            setCurrentBike(null);
            setFormData({
              name: '',
              engineCC: '',
              weight: '',
              price: '',
              summary: '',
              description: '',
              imageCover: ''
            });
            setShowForm(!showForm);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> {showForm ? 'Cancel' : 'Add New Bike'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            {currentBike ? 'Edit Bike' : 'Add New Bike'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Bike Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Engine CC</label>
              <input
                type="number"
                name="engineCC"
                value={formData.engineCC}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Summary</label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                required
                rows="2"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                rows="4"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Image URL</label>
              <input
                type="text"
                name="imageCover"
                value={formData.imageCover}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
            >
              {currentBike ? 'Update Bike' : 'Add Bike'}
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Engine CC</th>
              <th className="py-3 px-4 text-left">Weight</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Cluster</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(bikes || []).map(bike => (
              <tr key={bike._id} className="border-b">
                <td className="py-3 px-4">{bike.name}</td>
                <td className="py-3 px-4">{bike.engineCC}</td>
                <td className="py-3 px-4">{bike.weight} kg</td>
                <td className="py-3 px-4">${bike.price}</td>
                <td className="py-3 px-4">Cluster {bike.clusterId || 'N/A'}</td>
                <td className="py-3 px-4 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(bike)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(bike._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BikeManagement;