import { useState, useEffect } from 'react'
import React from 'react'
import JobListing from './JobListing'
import Spinner from './Spinner'
import CategoriesOption from './CategoriesOption'
import { Pagination } from "flowbite-react";

const JobListings = ({isHome = false, categories = []}) => {
	const [jobs, setJobs] = useState([])
	const [loading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [categoryid, setCategoryId] = useState('0')
	const [apiUrl, setApiUrl] = useState(isHome ? `/api/jobs?_limit=3` : `/api/jobs?_page=${currentPage}&_per_page=6`)

	useEffect(() => { 
		const fetchJobs = async () => {
			try{
				const res = await fetch(apiUrl)
				const data = await res.json()
				console.log(data)
				setTotalPage(data.pages)
				setJobs(data.data)
			} catch(err) {
				console.error('Error fetching data: ', err)
			} finally{
				setLoading(false)
			}
		}
		fetchJobs()
	}, [apiUrl])

	const handleCallback = (id) => {
		console.log(id)
		setCategoryId(id)
		setCurrentPage(1)
        setApiUrl((prevUrl) => id === '0' 
			? `/api/jobs?_page=1&_per_page=6`
			: `/api/jobs?categoryId=${id}&_page=1&_per_page=6`
		)
    };

	

  	const onPageChange = (page) => {
		console.log(page)
		setCurrentPage(page)
		setApiUrl((prevUrl) => categoryid === '0' 
			? `/api/jobs?_page=${page}&_per_page=6` 
			: `/api/jobs?categoryId=${categoryid}&_page=${page}&_per_page=6`
		)
	}

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

				<div className="flex overflow-x-auto sm:justify-center mt-4">
					<Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={onPageChange} />
				</div>
		</section>
	)
}

export default JobListings