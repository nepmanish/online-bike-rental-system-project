import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyBikeData, assets } from '../assets/assets'
import Loader from '../components/Loader'
const BikeDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [bike, setBike] = React.useState(null)
  const currency = import.meta.env.VITE_CURRENCY

  const handleSubmit = async (e)=>{
    e.preventDefault();
  }


  useEffect(() => {
    setBike(dummyBikeData.find(bike => bike._id === id))
  },[id])
  return  bike ?(
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>
      <button onClick={()=> navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 crusor-pointer '>
        <img src={assets.arrow_icon} alt="" className='rotate-180 opacity-65'/>
        Back to all bikes
      </button>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
        {/* left:bike image and details */}
        <div className='lg:col-span-2'> 
          <img src={bike.image} alt="" className='w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md' />
          <div className='space-y-6'>
            <div>
              <h1 className='text-3xl font-bold'>{bike.brand} {bike.model}</h1>
              <p className=' text-gray-500 text-lg'>{bike.category} • {bike.year}</p>
            </div>
            <hr className='border-borderColor my-6'/>
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {[
                {icon: assets.users_icon,  text: `${bike.seating_capacity} seats`},
                {icon: assets.car_icon, text: `${bike.transmission} `},
                {icon: assets.location_icon, text:`${bike.location}` },
                {icon: assets.fuel_icon, text:`${bike.fule_capacity}` },
              ].map(({icon,text})=>(
                <div key={text} className='flex flex-col items-center bg-light p-4 rounded-lg'>
                  <img src={icon} alt="" className='h-5 mb-2' />
                  {text}

                </div>
              ))}

            </div>

            {/* description */}
            <div>
              <h1 className='text=xl font-medium mb-3'>Description</h1>
              <p className='text-gray-500'>{bike.description}</p>
            </div>
            {/* features */}
            <div>
              <h1 className='text=xl font-medium mb-3'>Features</h1>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {
                  [ "Fully insured vehicle","Free halmet included", "Well maintained and serviced","GPS tracking enabled"].map((item)=>(
                    <li key={item} className='flex items-center text-gray-500'>
                      <img src={assets.check_icon} className='h-4 mr-2' alt="" />
                      {item}
                    </li>
                    
                  ))
                }
              </ul>
            </div>

          </div>

           </div>
          {/*rignt: booking forms */}
          <form onSubmit={handleSubmit} className='shadow-lg h-max sticky top-16 rounded-xl p-6 space-y-6 text-gray-500' >
            <p className='flex items-center justify-between text-2xl text-gray-800 font-semibold'>{currency}{bike.pricePerDay}<span className='text-base text-gray-400 font-normal'> per day</span></p>
            <hr className='border-borderColor my-6'/>

            <div className='flex flex-col gap-2'>
              <label htmlFor="pickup-date">Pickup Date</label>
              <input type="date" className='border border-borderColor px-3 py-2 rounded-lg' required id="pickup-date" min={new Date().toISOString().split("T")[0]} />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="return-date">Return Date</label>
              <input type="date" className='border border-borderColor px-3 py-2 rounded-lg' required id="return-date" />
            </div>

            <button className='w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-3 rounded-xl font-medium cursor-pointer'> Rent Now</button>

            <p className='text-center text-sm'></p>
            

          </form>

      </div>

    </div>
   
  ) : <Loader />
}

export default BikeDetails
