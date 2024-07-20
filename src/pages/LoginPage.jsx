import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const LoginPage = ({loginUser}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const submitForm = (e) => {
        e.preventDefault()
        
        const userData = {
            email,
            password
        }

        loginUser(userData)
        toast.success('User Login Successfully.')
        navigate('/')
    }

    return (
        <section className="bg-indigo-50">
            <div className="container m-auto max-w-2xl py-10 md:py-24">
            <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <form onSubmit={submitForm}>
                    <h2 className="text-3xl text-center font-semibold mb-6">Log In</h2>

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

                    <div>
                        <button
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                        type="submit">
                            Login
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </section>
    )
}

export default LoginPage