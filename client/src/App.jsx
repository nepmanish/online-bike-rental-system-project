import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, } from 'react-router-dom'
import BikeDetails from './pages/BikeDetails'
import Home from './pages/Home'
import Bikes from './pages/Bikes'
import MyBookings from './pages/MyBookings'
import { useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Login from './components/Login'
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
     </Routes>

     {!isOwnerPath && <Footer/>}
     



  


  
    </>
  )
}

export default App
