import React, { useEffect } from 'react'
import { dummyDashboardData } from '../../assets/assets'
import OwnerTitle from '../../components/Owner/OwnerTitle'
import { assets } from '../../assets/assets'


const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY
  const [data,setData] = React.useState({
    totalBikes: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  })
  const dashboardCards = [
    {title:'Total Bikes',value:data.totalBikes, icon: assets.carIconColored},
    {title:'Total Bookings',value:data.totalBookings, icon:assets.listIconColored},
    {title:'Pending',value:data.pendingBookings, icon:assets.cautionIconColored},
    {title:'Confirmed',value:data.completedBookings,icon:assets.listIconColored},  
  ]


  useEffect(() => {
    setData(dummyDashboardData)
  }, [])
  return (
    <div className='px-4 pt-10 md:px-10 flex-1'>
      <OwnerTitle title="Admim Dashboard" subTitle="Monitor overall platform preformance including total bikes,bookings, revenue, and recent activities"/>

      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl'>
        {dashboardCards.map((card,index)=>(
        <div key={index} className='flex items-center justify-between gap-2 p-4 border border-borderColor rounded-md'>

          <div>
            <h1 className='text-xs text-gray-500'>{card.title}</h1>
            <p className='text-lg font-semibold'>{card.value}</p>
            
          </div>
          <div className='flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10'>
            <img src={card.icon} alt="" className='h-4 w-4' />
          </div>

        </div>
        ))}


      </div>

      <div className='flex flex-warp items-start gap-6 mb-8 w-full'>
        <div className='p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full'>

          <h1 className='text-lg font-medium'>Recent Bookings</h1>
          <p className='text-gray-500'>Latest customer bookings</p>
          {data.recentBookings.map((booking,index)=>(
            <div key={index} className='mt-4 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10'>
                  <img src={assets.listIconColored} alt=""  className='h-5 w-5'/>
                </div>
                <div>
                  <p>{booking.bike.brand} {booking.bike.model}</p>
                  <p className='text-sm text-gray-500'> {booking.createdAt.split('T')[0]}</p>
                </div>

              </div>
              <div className='flex items-center gap-2 font-medium'>
                <p className='text-sm text-gray-500'>{currency}{booking.price} </p>
                <p className='px-3 py-0.5 border border-borderColor rounded-full text-sm'>{booking.status}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='p-4 md:p-6 mb-6 border border-borderColor rounded-md w-full md:max-w-xs'>
          <h1 className='text-lg font-medium'>Monthly Revenue</h1>
          <p className='text-gray-500'>Revenue for currnent month</p>
          <p className='text-3xl font-semibold mt-6 text-primary-dull'>{currency}{data.monthlyRevenue}</p>
        </div>

      </div>
      
    </div>
  )
}

export default Dashboard
