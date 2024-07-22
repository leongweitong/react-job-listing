import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const RegisterPage = ({registerUser}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate()

    const submitForm = (e) => {
        e.preventDefault()
        
        const newUser = {
            firstName,
            lastName,
            email,
            password,
            isAdmin
        }

        registerUser(newUser)

        toast.success('User Added Successfully.')

        navigate('/login')
    }

    return (
        <section className="bg-indigo-50">
            <div className="container m-auto max-w-2xl py-10 md:py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <form onSubmit={submitForm}>
                        <h2 className="text-3xl text-center font-semibold mb-6">Register</h2>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">First Name</label>
                            <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="border rounded w-full py-2 px-3 mb-2"
                            placeholder="John"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">Last Name</label>
                            <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="border rounded w-full py-2 px-3"
                            placeholder="Doe"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">Email Address</label>
                            <input
                            type="email"
                            id="email"
                            name="email"
                            className="border rounded w-full py-2 px-3"
                            placeholder="Doe@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                            <input
                            type="password"
                            id="password"
                            name="password"
                            className="border rounded w-full py-2 px-3"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                        </div>

                        <div className="mb-4">
                            <input
                            type="checkbox"
                            id="isAdmin"
                            name="isAdmin"
                            className="mr-2 cursor-pointer"
                            value={isAdmin}
                            onChange={(e) => setIsAdmin(!isAdmin)}
                            />
                            <label htmlFor="isAdmin" className="text-gray-700 mb-2 cursor-pointer">Click this, if you are admin.</label>
                        </div>

                        <div>
                            <button
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none focus:shadow-outline"
                            type="submit">
                                Register
                            </button>
                        </div>
                    </form>

                    <div className="my-8 flex items-center">
                        <div className="flex-grow bg bg-gray-300 h-0.5"></div>
                        <div className="flex-grow-0 mx-5">or</div>
                        <div className="flex-grow bg bg-gray-300 h-0.5"></div>
                    </div>

                    <div>
                        Already have an account? <Link to='/login' className='text-indigo-500 no-underline hover:underline'>Log in</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RegisterPage