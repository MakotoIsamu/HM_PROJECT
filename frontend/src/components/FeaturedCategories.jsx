import React from 'react'

const FeaturedCategories = () => { 
  return (
    <div className='w-full flex justify-center h-auto cursor-pointer'>
        <div className='grid grid-cols-2 max-w-5xl font-orbitron'>
            <div><img src="/assets/HomePage_Images/FNP_2428001_Ws50z_2296.avif" alt="" className='w-full'/><div><p className='font-bold hover:underline mt-3'>SHEERTEX</p><p className='hover:underline text-[12px] mb-4'>EXPLORE</p></div></div>
            <div><img src="/assets/HomePage_Images/Knitwear-CE-wk40-41.avif" alt="" className='w-full'/><div><p className='font-bold hover:underline mt-3'>KNITWEAR</p><p className='hover:underline text-[12px] mb-4'>EXPLORE</p></div></div>
            <div><img src="/assets/HomePage_Images/Outdoor-CE-wk40-41.avif" alt="" className='w-full'/><div><p className='font-bold hover:underline mt-3'>OUTWEAR</p><p className='hover:underline mb-4'>EXPLORE</p></div></div>
            <div><img src="/assets/HomePage_Images/Trousers-CE-wk40-41.avif" alt="" className='w-full'/><div><p className='font-bold hover:underline mt-3'>PANTS</p><p className='hover:underline mb-4'>EXPLORE</p></div></div>
        </div>
    </div>
  )
}

export default FeaturedCategories
