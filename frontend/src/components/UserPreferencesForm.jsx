import React from 'react';

const UserPreferencesForm = ({ preferences, setPreferences, onSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 mb-2">Max Price ($)</label>
          <input
            type="number"
            name="price"
            value={preferences.price}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Engine Size (CC)</label>
          <input
            type="number"
            name="engineCC"
            value={preferences.engineCC}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={preferences.weight}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            required
          />
        </div>
      </div>
      
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
      >
        Update Preferences
      </button>
    </form>
  );
};

export default UserPreferencesForm;