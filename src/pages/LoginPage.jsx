import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useGoogleLogin } from '@react-oauth/google';
import googleIcon from '../assets/images/google.png'

const LoginPage = ({setCurrentUser, loginUser}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordType, setPasswordType] = useState('password')
    const navigate = useNavigate()

    const submitForm = (e) => {
        e.preventDefault()
        
        const userData = {
            email,
            password
        }

        loginUser(userData).then((user) => {
            if (user && user.successLogin) {
                toast.success('User Login Successfully.');
                navigate('/');
            } else {
                toast.error('Your Email or Password Is Incorrect. Please Try Again.');
            }
        }).catch(error => {
            toast.error('An error occurred during login. Please try again.');
            console.error('Login error:', error);
        });

        
    }

    const triggerPassword = () => setPasswordType(passwordType === 'password' ? 'text' : 'password');

    const loginWithGoogle = useGoogleLogin({
        onSuccess: (codeResponse) => {
            fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
                headers: {
                    Authorization: `Bearer ${codeResponse.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                setCurrentUser({
                    id: data.id,
                    firstName: data.given_name,
                    lastName: data.family_name,
                    email: data.email,
                    password: 'google password',
                    isAdmin: true
                })
                toast.success('User Login Successfully.');
                navigate('/');
            })
        },
        onError: (error) => console.log('Login Failed:', error)
    });

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
                            <div className="relative">
                                <input
                                    type={passwordType}
                                    id="password"
                                    name="password"
                                    className="border rounded w-full py-2 px-3"
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                    {passwordType === 'password' ? (
                                        <FaEyeSlash className='text-gray-700 text-2xl cursor-pointer' onClick={triggerPassword} />
                                    ) : (
                                        <FaEye className='text-gray-700 text-2xl cursor-pointer' onClick={triggerPassword} />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none focus:shadow-outline"
                            type="submit">
                                Login
                            </button>
                        </div>
                    </form>

                    <div className="my-8 flex items-center">
                        <div className="flex-grow bg bg-gray-300 h-0.5"></div>
                        <div className="flex-grow-0 mx-5">or</div>
                        <div className="flex-grow bg bg-gray-300 h-0.5"></div>
                    </div>

                    <div className="mb-8">
                        <button onClick={loginWithGoogle} className='w-full border border-gray-700 rounded-md py-2 px-4 
                            font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-between'
                        >
                            <img src={googleIcon} alt="Google icon" className="w-6 h-6" />
                            <span>Continue With Google</span>
                            <span></span>
                        </button>
                    </div>

                    <div>
                        Don't have an account? <Link to='/register' className='text-indigo-500 no-underline hover:underline'>Register</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage