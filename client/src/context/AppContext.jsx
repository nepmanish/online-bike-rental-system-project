import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = false;          //  send the JWT in headers
                                                  //    (backend’s protect() expects it)

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setToken]       = useState(null);
  const [user,  setUser]        = useState(null);   // full user object
  const [isOwner, setIsOwner]   = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Booking‑flow states you already had
  const [pickupDate, setPickupDate]   = useState('');
  const [returnDate, setReturnDate]   = useState('');
  const [bikes, setBikes]             = useState([]);

 
  const attachToken = (jwt) => {
    axios.defaults.headers.common['authorization'] = `Bearer ${jwt}`;
  };

    // Startup ‑ restore persisted session

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser  = localStorage.getItem('user');

    if (storedToken) {
      setToken(storedToken);
      attachToken(storedToken);
    }
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setIsOwner(parsed.role === 'owner');
    }
    // You can still auto‑load bikes, etc.
    fetchBikes().catch(() => {});
  }, []);

  
  //  API Calls
   
  const fetchBikes = async () => {
    try {
      const { data } = await axios.get('/api/user/bikes');   // keep your existing route
      if (data.success) setBikes(data.bikes);
      else toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const saveSession = (jwt, userObj) => {
    setToken(jwt);
    setUser(userObj);
    setIsOwner(userObj.role === 'owner');

    localStorage.setItem('token', jwt);
    localStorage.setItem('user', JSON.stringify(userObj));

    attachToken(jwt);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setToken(null);
    setUser(null);
    setIsOwner(false);

    delete axios.defaults.headers.common['authorization'];
    toast.success('Logout successful');
    navigate('/');
  };

  
  const value = {
    navigate, currency, axios,

    token, setToken: saveSession,
    user,  setUser,
    isOwner, setIsOwner,
    logout,
    showLogin, setShowLogin,

    // bikes & booking
    bikes, setBikes, fetchBikes,
    pickupDate, setPickupDate,
    returnDate, setReturnDate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
