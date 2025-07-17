import React from "react";
import { createContext, useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY

    const [token, setToken] = React.useState(null)
    const [user, setUser] = React.useState(null)
    const [isOwner, setIsOwner] = React.useState(false)
    const [showLogin, setShowLogin] = React.useState(false)
    const [pickupDate, setPickupDate] = React.useState('')
    const [returnDate, setReturnDate] = React.useState('')

    const [bikes, setBikes] = React.useState([])

    //function to check if user is logged in

    const fetchUser = async () => {
        try {
            const {data} = await axios.get('/api/user/data')
            if (data.success){
                setUser(data.user)
            setIsOwner(data.user.role === 'owner')
            }else{
                navigate('/')
            }
            
        } catch (error) {
           toast.error(error.message)
        }
    }
    // function to fetch all bikes from the server

    const fetchBikes = async () => {
        try {
            const {data} = await axios.get('/api/user/bikes')
            data.success ? setBikes(data.bikes) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    //function to logout user

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setIsOwner(false)
        axios.defaults.headers.common['authorization'] = ''
        toast.success('Logout successful')
    }

    // useEffect to retrieve the token from localstorage
    useEffect(() => {
        const token = localStorage.getItem('token')
            setToken(token)
            fetchBikes()
        
    },[])
    //useEffect to fetch user data when token is available

    useEffect(()=>{
        if (token){
            axios.defaults.headers.common['authorization'] = `${token}`
            fetchUser()
        }

    },[token])



    const value = {
        navigate,currency, axios,user,setUser,token,setToken, isOwner, setIsOwner, fetchUser, showLogin, setShowLogin,logout, fetchBikes, bikes, setBikes, pickupDate, setPickupDate, returnDate, setReturnDate


    };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=>{

    return useContext(AppContext)
}