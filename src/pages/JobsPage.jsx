import React from 'react'
import JobListings from '../components/JobListings'
import CategoriesOption from '../components/CategoriesOption'

const JobsPage = ({categories}) => {
  return (
    <section className="bg-blut-50">
      <CategoriesOption categories={categories}  />
      <JobListings />
    </section>
  )
}

export default JobsPage