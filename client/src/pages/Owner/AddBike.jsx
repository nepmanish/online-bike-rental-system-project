import React from 'react'
import OwnerTitle from '../../components/Owner/OwnerTitle'
import { assets } from '../../assets/assets'

const AddBike = () => {

  const currency = import.meta.env.VITE_CURRENCY

  const [image,setImage] = React.useState(null)
  const [bike,setBike] = React.useState({
    brand: '',
    model: '',
    year: 0,
    pricePerDay: 0,
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: 0,
    location: '',
    description: '',
  })

  const onSubmitHandler = async (e) => {
    e.preventDefault()
  }
  return (
    <div className='px-4 py-10 md:px-10 flex-1'>
      <OwnerTitle title="Add New Bike" subTitle="Fill in details to list a new bike for booking, including pricing, and car specification."/>

      <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl '>

        <div>
          <label htmlFor="bike-image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" className='h-14 rounded cursor-pointer' />
            <input type="file" id='bike-image' accept='image/*' hidden onChange={e => setImage(e.target.files[0])} />
          </label>

          <p>Upload a picture of your bike</p>

        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>


          <div className='flex flex-col w-full'>
          <label>Brand</label>
          <input type="text" placeholder='yamaha, bajaj, honda....' required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={bike.brand} onChange={e => setBike({...bike, brand: e.target.value})} />
        </div>

        <div className='flex flex-col w-full'>
          <label>model</label>
          <input type="text" placeholder='Fz v2, xpulse200, shine....' required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={bike.model} onChange={e => setBike({...bike, model: e.target.value})} />
        </div>

        
        
          </div>

          <div className='grid grid-cols-1 ms:grid-cols-2 md:grid-cols-3 gap-6 '>

          <div className='flex flex-col w-full'>
          <label>Year</label>
          <input type="number" placeholder='2025' required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={bike.year} onChange={e => setBike({...bike, year: e.target.value})} />
        </div>

        <div className='flex flex-col w-full'>
          <label>Daily Price ({currency})</label>
          <input type="number" placeholder='1000' required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={bike.pricePerDay} onChange={e => setBike({...bike, pricePerDay: e.target.value})} />
        </div>

        <div className='flex flex-col w-full'>
          <label>Category</label>
          <select onChange={e => setBike({...bike, category: e.target.value})} value={bike.category} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
            <option value="">select a category</option>
            <option value="dual-sport">dual-sport</option>
            <option value="street">street</option>
            <option value="off-road">off-road</option>
          </select>
        </div>



          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

          <div className='flex flex-col w-full'>
          <label>Transmission</label>
          <select onChange={e => setBike({...bike, transmission: e.target.value})} value={bike.transmission} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
            <option value="">select a transmission</option>
            <option value="manual">manual</option>
            <option value="automatic">automatic</option>
          </select>
        </div>  

        <div className='flex flex-col w-full'>
          <label>Fuel Type</label>
          <select onChange={e => setBike({...bike, fuel_type: e.target.value})} value={bike.fuel_type} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
            <option value="">select a fuel type</option>
            <option value="petrol">petrol</option>
            <option value="diesel">electric</option>
          </select>
        </div>

            
          </div>
          <div className='flex flex-col w-full'>


          <label>Location</label>
          <select onChange={e => setBike({...bike, location: e.target.value})} value={bike.location} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
            <option value="">select a location</option>
            <option value="Butwal">Butwal</option>
            <option value="Kathmandu">Kathmandu</option>
            <option value="Pokhara">Pokhara</option>
            <option value="Tansen">Tansen</option>
          </select>
        </div>

        <div className='flex flex-col w-full'>
          <label>Description</label>
          <textarea rows={5} placeholder='e.g. The bike is in good condition' required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={bike.description} onChange={e => setBike({...bike, description: e.target.value})} > </textarea>
        </div>

        <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-blue-600 text-white rounded-md font-medium w-max cursor-pointer'>

          <img src={assets.tick_icon} alt=""  />
          list your bike
        </button>


        
      </form>
    </div>
  )
}

export default AddBike
