import React, { useState, useEffect } from 'react';
import { getUsers, updateUser, deleteUser } from '../../services/api';
import { FaEdit, FaTrash, FaUserShield } from 'react-icons/fa';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingPreferences, setEditingPreferences] = useState(null);
  const [roleUpdate, setRoleUpdate] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (userId, newRole) => {
    setRoleUpdate(prev => ({ ...prev, [userId]: newRole }));
  };

  const saveRole = async (userId) => {
    try {
      await updateUser(userId, { role: roleUpdate[userId] });
      fetchUsers();
      setRoleUpdate(prev => {
        const newState = { ...prev };
        delete newState[userId];
        return newState;
      });
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const togglePreferencesEdit = (userId, preferences) => {
    if (editingUserId === userId) {
      setEditingUserId(null);
      setEditingPreferences(null);
    } else {
      setEditingUserId(userId);
      setEditingPreferences(preferences);
    }
  };

  const savePreferences = async (userId) => {
    try {
      await updateUser(userId, { preferences: editingPreferences });
      setEditingUserId(null);
      setEditingPreferences(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Preferences</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(users || []).map(user => (
              <tr key={user._id} className="border-b">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    {roleUpdate[user._id] !== undefined ? (
                      <select
                        value={roleUpdate[user._id]}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="border rounded p-1"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <div className="flex items-center">
                        <span className={`${user.role === 'admin' ? 'text-blue-600' : ''}`}>
                          {user.role}
                        </span>
                        {user.role === 'admin' && <FaUserShield className="ml-2 text-blue-600" />}
                      </div>
                    )}
                    
                    {roleUpdate[user._id] !== undefined ? (
                      <button
                        onClick={() => saveRole(user._id)}
                        className="ml-2 bg-blue-600 text-white px-2 py-1 rounded text-sm"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRoleChange(user._id, user.role)}
                        className="ml-2 text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Change
                      </button>
                    )}
                  </div>
                </td>
                
                <td className="py-3 px-4">
                  {editingUserId === user._id ? (
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-xs text-gray-500">Price ($)</label>
                        <input
                          type="number"
                          value={editingPreferences.price}
                          onChange={(e) => setEditingPreferences({
                            ...editingPreferences,
                            price: Number(e.target.value)
                          })}
                          className="w-full p-1 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500">CC</label>
                        <input
                          type="number"
                          value={editingPreferences.engineCC}
                          onChange={(e) => setEditingPreferences({
                            ...editingPreferences,
                            engineCC: Number(e.target.value)
                          })}
                          className="w-full p-1 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500">Weight (kg)</label>
                        <input
                          type="number"
                          value={editingPreferences.weight}
                          onChange={(e) => setEditingPreferences({
                            ...editingPreferences,
                            weight: Number(e.target.value)
                          })}
                          className="w-full p-1 border rounded"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div>Price: ${user.preferences?.price || 'N/A'}</div>
                      <div>CC: {user.preferences?.engineCC || 'N/A'}</div>
                      <div>Weight: {user.preferences?.weight || 'N/A'} kg</div>
                    </div>
                  )}
                </td>
                
                <td className="py-3 px-4">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => togglePreferencesEdit(user._id, user.preferences || {})}
                      className={`px-3 py-1 rounded ${
                        editingUserId === user._id 
                          ? 'bg-green-600 text-white' 
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      {editingUserId === user._id ? 'Save Prefs' : 'Edit Prefs'}
                    </button>
                    
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;