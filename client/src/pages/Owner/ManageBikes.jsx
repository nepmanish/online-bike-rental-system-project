import React, { useEffect } from 'react'
import { assets, dummyBikeData } from '../../assets/assets'
import OwnerTitle from '../../components/Owner/OwnerTitle'

const ManageBikes = () => {
  const currency = import.meta.env.VITE_CURRENCY
  const [bikes, setBikes] = React.useState([])

  const fetehOwnerBikes = async () => {
    setBikes(dummyBikeData)
  }

  useEffect(() => {
    fetehOwnerBikes()
  }, [])
  return (
    <div className='px-4 py-10 md:px-10 w-full'>

      <OwnerTitle title="Manage Bikes" subTitle="View all listed bikes, update their details, or remove them from the booking platform."/>

      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>

        <table className='w-full border-collapse text-left text-sm text-gray-600'>

          <thead className='text-gray-500'>
            <tr>
              <th className='p-3 font-medium'>Bike</th>
              <th className='p3 font-medium max-md:hidden'>Category</th>
              <th className='p-3 font-medium'>Price</th>
              <th className='p3 font-medium max-md:hidden'>Status</th>
              <th className='p-3 font-medium'>Actions</th>

            </tr>

          </thead>

          <tbody>
            {bikes.map((bike,index) => (
              <tr key={index} className='border-t border-borderColor'>

                <td className='p-3 flex items-center gap-3'>
                  <img src={bike.image}  alt="" className='h-12 w-12 object-cover rounded-md aspect-square'/>
                  <div className='max-md:hidden'>
                    <p className='font-medium'>{bike.brand} {bike.model}</p>
                    <p className='font-medium'>{bike.seating_capacity} • {bike.transmission}</p>
                  </div>
                </td>

                <td className='p-3 max-md:hidden'>{bike.category}</td>
                <td className='p-3'>{currency}{bike.pricePerDay}/day</td>
                
                <td className='p-3 max-md:hidden'>
                  <span className={`px-3 py-1 rounded-full text-xs ${bike.isAvaliable ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {bike.isAvaliable ? 'Available' : 'Unavailable'}
                  </span>

                </td>

                <td className='flex items-center p-3'>
                  <img src={bike.isAvaliable ? assets.eye_close_icon : assets.eye_icon} alt="" className='cursor-pointer' />
                  <img src={assets.delete_icon} alt="" className='cursor-pointer' />


                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageBikes
