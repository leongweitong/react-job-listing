import React from 'react'
import JobListings from '../components/JobListings'

const JobsPage = ({categories}) => {
  return (
    <section className="bg-blut-50">
      <JobListings categories={categories} />
    </section>
  )
}

export default JobsPage