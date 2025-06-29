import React, { useEffect } from 'react'
import { dummyBikeData  } from '../assets/assets'
import Title from '../components/Title'



const MyBookings = () => {
  const [bookings, setBookings] = React.useState([])

  const fetchBookings = async () => {
    setBookings(dummyBikeData)
  }

  useEffect(() => {
    fetchBookings()
  }, [])
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl'>

      <Title title='My Bookings' 
      subTitle='View and manage your all bike bookings' align='left'/>
      
      {/* <div>

        {bookings.map((booking,index)=>(
          <div key={booking._id} className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12'>

            <div className='md:col-span-1'>
              <div className='rounded-md overflow-hidden mb-3'>
              <img src={booking.bike.image} alt="" className='w-full h-auto aspect-video object-cover' />
            </div>
            <p className='text-lg font-medium mt-2'>{booking.bike.brand} • {booking.bike.model}</p>

            <p className='text-gray-500'>{booking.bike.year} • {booking.bike.category} • {booking.bike.location} </p>
            </div>

          </div>

        ))}
      </div> */}
  
    </div>
  )
}

export default MyBookings
