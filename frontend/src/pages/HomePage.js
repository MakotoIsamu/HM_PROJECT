import React from 'react'
import HeroSection from '../components/HeroSection'
import NewlyArrival from '../components/NewlyArrival'
import FeaturedProducts from '../components/FeaturedProducts'
import FeaturedCategories from '../components/FeaturedCategories'

const HomePage = () => {
  return (
    <div>
      <HeroSection/>
      <NewlyArrival/>
      <FeaturedProducts/>
      <FeaturedCategories/>
    </div>
  )
}

export default HomePage