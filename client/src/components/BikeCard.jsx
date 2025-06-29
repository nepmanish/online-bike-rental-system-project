import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
const BikeCard = ({ bike }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  return (
    <div onClick={()=>{navigate(`/bike-details/${bike._id}`); scrollTo(0, 0)}} className='group rounded-1xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer'>
      <div className='relative h-48 overflow-hidden'>
        <img
          src={bike.image}
          alt="bike"
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
        />

        {bike?.isAvaliable && (
          <p className='absolute top-4 left-4 bg-blue-600 text-white text-xs px-2.5 py-1 rounded-full'>
            Available Now
          </p>
        )}

        <div className='absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-l-lg'>
          <span className='font-semibold'>{currency}{bike.pricePerDay}</span>
          <span className='text-sm text-white/80'> / day</span>
        </div>
      </div>

      <div className='p-4 sm:p-5'>
        <div className='flex justify-between items-start mb-2'>
          <div>
            <h3 className='text-lg font-medium'>{bike.brand} {bike.model}</h3>
            <p className='text-muted-foreground text-sm'>{bike.category} • {bike.year}</p>
          </div>
        </div>

        <div className='mt-4 grid grid-cols-2 gap-y-2 text-gray-600'>
          <div className='flex items-center text-sm text-muted-foreground'>
            <img src={assets.location_icon} alt="location" className='h-4 mr-2' />
            <span>{bike.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;
