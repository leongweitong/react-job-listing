import { useState, useEffect } from 'react'
import React from 'react'
import JobListing from './JobListing'
import Spinner from './Spinner'
import CategoriesOption from './CategoriesOption'

const JobListings = ({isHome = false, categories = []}) => {
	const [jobs, setJobs] = useState([])
	const [loading, setLoading] = useState(true)
	const [apiUrl, setApiUrl] = useState(isHome ? '/api/jobs?_limit=3' : '/api/jobs')

	useEffect(() => { 
		const fetchJobs = async () => {
			try{
				const res = await fetch(apiUrl)
				const data = await res.json()
				setJobs(data)
			} catch(err) {
				console.error('Error fetching data: ', err)
			} finally{
				setLoading(false)
			}
		}
		fetchJobs()
	}, [apiUrl])

	const handleCallback = (categoryid) => {
        categoryid === 'all' ? setApiUrl('/api/jobs') : setApiUrl(`/api/jobs?categoryId=${categoryid}`)
    };

	return (
		<section className="bg-blue-50 px-4 py-10">
			<div className="container-xl lg:container m-auto">
				{!isHome && <CategoriesOption parentCallback={handleCallback} categories={categories} />}

				<h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
				{ isHome ? 'Recent Jobs' : 'Browse Jobs'}
				</h2>

				{loading ? (<Spinner loading={loading} />) : 
					(<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{jobs.map((job) => (
							<JobListing key={job.id} job={job} />
						))}
					</div>)
				}
				</div>
		</section>
	)
}

export default JobListings