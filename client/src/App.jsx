import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import BikeDetails from './pages/BikeDetails'
import Home from './pages/Home'
import Bikes from './pages/Bikes'
import MyBookings from './pages/MyBookings'
import Footer from './components/Footer'
import Login from './components/Login'
import Dashboard from './pages/Owner/Dashboard'
import Layout from './pages/Owner/Layout'
import AddBike from './pages/Owner/AddBike'
import ManageBikes from './pages/Owner/ManageBikes'
import ManageBooking from './pages/Owner/ManageBooking'
const App = () => {

  const [showLogin, setShowLogin] = React.useState(false)
  const isOwnerPath = useLocation().pathname.startsWith("/owner")

  return (
    <>
    {showLogin && <Login setShowLogin={setShowLogin}/>}
    
     {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}

     <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/bike-details/:id' element={<BikeDetails/>}/>
       <Route path='/bikes' element={<Bikes/>}/>
       <Route path='/my-bookings' element={<MyBookings/>}/>
       <Route path='/owner' element={<Layout/>}>  
        <Route index element={<Dashboard/>}/>
        <Route path='add-bike' element={<AddBike/>}/>
        <Route path='manage-bikes' element={<ManageBikes/>}/>
        <Route path='manage-bookings' element={<ManageBooking/>}/> 
       </Route>
     </Routes>

     {!isOwnerPath && <Footer/>}
     



  


  
    </>
  )
}

export default App
