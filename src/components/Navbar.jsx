import React, {useState} from 'react'
import logo from '../assets/images/jobfind-logo.png'
import {NavLink, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert';
import { FaBars } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { FaAngleRight } from 'react-icons/fa';

const Navbar = ({user, logoutUser}) => {
	const [showMenu, setShowMenu] = useState(false)
	const [animationClass, setAnimationClass] = useState('animate-fadeInMenu');
	const navigate = useNavigate()

	const linkClass = ({isActive}) => 
		isActive ? 
			'hidden md:block bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2' 
				: 
			'hidden md:block text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'

	const logout = () => {
		confirmAlert({
            title: 'Confirm to logout',
            message: 'Are you sure you want to logout?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    logoutUser()
					toast.success('Logout Successfully.')
					navigate('/')
					handleCloseMenu()
                }
              },
              {
                label: 'Cancel',
                onClick: () => {

                }
              }
            ]
        })
	}

	const handleShowMenu = () => {
		setAnimationClass('animate-fadeInMenu');
		setTimeout(() => setShowMenu(true), 500)
	}

	const handleCloseMenu = () => {
		setAnimationClass('animate-fadeOutMenu');
		setTimeout(() => setShowMenu(false), 500)
	};

	return (
		<>
		<div className={`${showMenu ? 'block' : 'hidden'} ${animationClass} fixed w-screen h-screen w-72 bg-white z-10 overflow-hidden`}>
			<div className="flex flex-col px-4 py-6 font-bold">
				<FaXmark onClick={handleCloseMenu} className='self-end text-3xl mb-4' />
				<NavLink to="/" className='flex items-center justify-between py-3 border-b' onClick={handleCloseMenu}>
					<span>Home</span>
					<FaAngleRight className='text-2xl font-light'  />
				</NavLink>
				<NavLink to="/jobs" className='flex items-center justify-between py-3 border-b' onClick={handleCloseMenu}>
					<span>Jobs</span>
					<FaAngleRight className='text-2xl font-light'  />
				</NavLink>
				{user && user.isAdmin && <NavLink to="/add-job" className='flex items-center justify-between py-3 border-b' onClick={handleCloseMenu}>
					<span>Add Job</span>
					<FaAngleRight className='text-2xl font-light'  />
				</NavLink>}
				{user && <button type='button' onClick={logout} className='flex items-center justify-between py-3 border-b text-left'>
					<span>Logout</span>
					<FaAngleRight className='text-2xl font-light'  />
				</button>}
				{!user && <NavLink to="/login" className='flex items-center justify-between py-3 border-b' onClick={handleCloseMenu}>
					<span>Login</span>
					<FaAngleRight className='text-2xl font-light'  />
				</NavLink>}
				{!user && <NavLink to="/register" className='flex items-center justify-between py-3 border-b' onClick={handleCloseMenu}>
					<span>Register</span>
					<FaAngleRight className='text-2xl font-light'  />
				</NavLink>}
			</div>
		</div>
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
							{user && user.isAdmin && <NavLink to="/add-job" className={linkClass}>Add Job</NavLink>}
							{user && <button type='button' onClick={logout} className='hidden md:block text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'>Logout</button>}
							{!user && <NavLink to="/login" className={linkClass}>Login</NavLink>}
							<FaBars onClick={handleShowMenu} className='md:hidden text-white self-center cursor-pointer text-3xl' />
						</div>
					</div>
				</div>
				</div>
			</div>
		</nav>
		</>
	)
}

export default Navbar