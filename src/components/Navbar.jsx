import React from 'react'
import logo from '../assets/images/jobfind-logo.png'
import {NavLink, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

const Navbar = ({user, logoutUser}) => {
	const navigate = useNavigate()

	const linkClass = ({isActive}) => 
		isActive ? 
			'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2' 
				: 
			'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'

	const logout = () => {
		logoutUser()
		toast.success('Logout Successfully.')
		navigate('/')
	}

	return (
		<nav className="bg-indigo-700 border-b border-indigo-500">
			<div className="container-xl lg:container m-auto px-4">
				<div className="flex h-20 items-center justify-between">
				<div className="flex flex-1 items-center justify-between md:items-stretch md:justify-start">
					{/* <!-- Logo --> */}
					<NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
						<img className="h-16 w-auto" src={ logo } alt="React Jobs" />
						<span className="hidden md:block text-white text-2xl font-bold ml-2">FindJobs</span>
					</NavLink>
					<div className="md:ml-auto self-center">
						<div className="flex space-x-2">
							<NavLink to="/" className={linkClass}>Home</NavLink>
							<NavLink to="/jobs" className={linkClass}>Jobs</NavLink>
							<NavLink to="/add-job" className={linkClass}>Add Job</NavLink>
							{user && <button type='button' onClick={logout} className='text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'>Logout</button>}
							{!user && <NavLink to="/login" className={linkClass}>Login</NavLink>}
						</div>
					</div>
				</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar