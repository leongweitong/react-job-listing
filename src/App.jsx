import React, {useState} from 'react'
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
	const [currentUser, setCurrentUser] = useState(null)

	// Get All Users Data
	const getAllUser = async () => {
		const res = await fetch('/api/users')
		const data = await res.json()
		return data
	}
	// Register User
	const registerUser = async (user) => {
		const res = await fetch('/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		})
		return
	}

	// Login User
	const loginUser = async (loginUser) => {
		try {
			const users = await getAllUser();
			const user = users.find(user => user.email === loginUser.email && user.password === loginUser.password);
	
			if (user) {
				user.successLogin = true;
				setCurrentUser(user);
				return user;
			} else {
				return { successLogin: false };
			}
		} catch (error) {
			console.error('Error during login:', error);
			return { successLogin: false };
		}
	};

	// Logout User
	const logoutUser = () => setCurrentUser(null)

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
			<Route path="/" element={<MainLayout user={currentUser} logoutUser={logoutUser} /> }>
				<Route index element={ <HomePage /> } />
				{
					!currentUser && (
						<>
							<Route path="/register" element={ <RegisterPage registerUser={registerUser} /> } />
							<Route path="/login" element={ <LoginPage loginUser={loginUser} /> } />
						</>
					)
				}
				<Route path="/jobs" element={ <JobsPage /> } />
				<Route path="/jobs/:id" element={ <JobPage deleteJob={deleteJob} user={currentUser} /> } loader={jobLoader} />
				{
					currentUser && currentUser.isAdmin && (<>
						<Route path="/add-job" element={ <AddJobPage addJobSubmit={addJob} /> } />
						<Route path="/edit-job/:id" element={ <EditJobPage editJob={editJob} /> } loader={jobLoader} />
					</>)
				}
				<Route path="*" element={ <NotFoundPage /> } />
			</Route>
		)
	)

  	return <RouterProvider router={router} />
}

export default App