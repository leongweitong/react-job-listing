import React from 'react'
import Hero from '../components/Hero'
import HomeCards from '../components/HomeCards'
import Categories from '../components/Categories'
import JobListings from '../components/JobListings'
import ViewAllJobs from '../components/ViewAllJobs'

const HomePage = () => {
  return (
    <>
        <Hero />
        <HomeCards />
        <Categories />
        <JobListings isHome={true} />
        <ViewAllJobs />
    </>
  )
}

export default HomePage