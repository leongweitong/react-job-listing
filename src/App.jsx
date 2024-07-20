import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import JobsPage from './pages/JobsPage'
import NotFoundPage from './pages/NotFoundPage'
import JobPage, {jobLoader} from './pages/JobPage'
import AddJobPage from './pages/AddJobPage'
import EditJobPage from './pages/EditJobPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

const App = () => {
	// Register User
	const registerUser = (user) => {
		console.log(user)
	}

	// Login User
	const loginUser = (user) => {
		console.log(user)
	}

	// Add new job
	const addJob = async (newJob) => {
		const res = await fetch('/api/jobs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newJob)
		})
		return
	}

	// Edit job
	const editJob = async (job) => {
		const res = await fetch(`/api/jobs/${job.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(job)
		})
		return
	}

	// Delete job
	const deleteJob = async (id) => {
		const res = await fetch(`/api/jobs/${id}`, {
			method: 'DELETE',
		})
		return
	}
	
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<MainLayout /> }>
				<Route index element={ <HomePage /> } />
				<Route path="/register" element={ <RegisterPage registerUser={registerUser} /> } />
				<Route path="/login" element={ <LoginPage loginUser={loginUser} /> } />
				<Route path="/jobs" element={ <JobsPage /> } />
				<Route path="/add-job" element={ <AddJobPage addJobSubmit={addJob} /> } />
				<Route path="/jobs/:id" element={ <JobPage deleteJob={deleteJob} /> } loader={jobLoader} />
				<Route path="/edit-job/:id" element={ <EditJobPage editJob={editJob} /> } loader={jobLoader} />
				<Route path="*" element={ <NotFoundPage /> } />
			</Route>
		)
	)

  	return <RouterProvider router={router} />
}

export default App