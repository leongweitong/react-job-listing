import React from 'react'
import Hero from '../components/Hero'
import HomeCards from '../components/HomeCards'
import Categories from '../components/Categories'
import JobListings from '../components/JobListings'
import ViewAllJobs from '../components/ViewAllJobs'

const HomePage = ({categories}) => {
  return (
    <>
        <Hero />
        <HomeCards />
        <Categories categories={categories} />
        <JobListings isHome={true} />
        <ViewAllJobs />
    </>
  )
}

export default HomePage