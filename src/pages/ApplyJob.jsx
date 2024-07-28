import React, {useState} from 'react'
import { useLoaderData } from 'react-router-dom'
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import packageJson from '../../package.json';
import { toast } from 'react-toastify'

const ApplyJob = ({user}) => {
    const [pdf, setPdf] = useState(null)
    const job = useLoaderData()
    const [firstName, setFirstName] = useState(user?.firstName || '')
    const [lastName, setLastName] = useState(user?.lastName || '')
    const [email, setEmail] = useState(user?.email || '')
    const [resume, setResume] = useState(null)
    const pdfjsVersion = packageJson.dependencies['pdfjs-dist'].slice(1)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        console.log(file)
        if (file) {
            const fileUrl = URL.createObjectURL(file)
            setPdf(fileUrl)
            setResume(file)
        }
    }

    const submitForm = async (e) => {
        e.preventDefault()

        const newApplication = {
            user: {
                id: user.id,
                firstName,
                lastName,
                email
            },
            jobId: job.id,
            status: 'pending',
            resume: resume.name
        }

        const response = await fetch('/api/applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newApplication)
        })

        if (response.ok) {
            toast.success('Application submitted successfully!')
            setFirstName('')
            setLastName('')
            setEmail('')
            setPdf(null)
            setResume(null)
        }
    }

    return (
        <section className="bg-indigo-50">
            <div className="container m-auto p-4">
                <form onSubmit={submitForm}>
                    <div className='bg-white rounded-xl p-4 mb-4'>
                        <div className='font-thin text-gray-700 mb-1'>Applying for</div>
                        <div className='font-semibold text-2xl text-gray-800'>{job.title}</div>
                        <div className='text-lg mb-2'>{job.company.name}</div>
                        <div className='underline underline-offset-4 cursor-pointer'>View job description</div>
                    </div>

                    <div className='bg-white rounded-xl p-4 mb-4'>
                        <div className='font-semibold text-2xl text-gray-800 mb-2'>Contact Information</div>
                        <div className='flex flex-col mb-2'>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id='firstName' className='rounded focus:outline-none focus:border-indigo-500' 
                            value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id='lastName' className='rounded focus:outline-none focus:border-indigo-500'
                            value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id='email' className='rounded focus:outline-none focus:border-indigo-500' 
                            value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                    </div>

                    <div className='bg-white rounded-xl p-4 mb-4'>
                        <div className='font-semibold text-2xl text-gray-800 mb-2'>Upload Resume</div>
                        <input type="file" id="resume" name="resume" onChange={handleFileChange}  accept="application/pdf"
                            className="block w-full text-sm text-gray-900 border rounded-lg cursor-pointer bg-white mb-2"
                            aria-describedby="file_input_help" required
                        />
                        <p id="file_input_help" className="text-sm text-gray-500 mb-2">Please upload your resume in PDF format.</p>
                        {pdf && <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}>
                            <Viewer fileUrl={pdf} />
                        </Worker>}
                    </div>

                    <div className='bg-white rounded-xl p-4 mb-4'>
                        <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 
                            rounded w-full focus:outline-none focus:shadow-outline" type="submit"
                        >Submit</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default ApplyJob