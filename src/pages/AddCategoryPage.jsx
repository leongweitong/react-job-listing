import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify'

const AddCategoryPage = () => {
    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])

    const getAllCategories = async () => {
        const res = await fetch('/api/categories')
        const data = await res.json()
        setCategories(data)
    }

    const submitForm = (e) => {
        e.preventDefault()
        addCategory({name})
        toast.success('Category Added Successfully.')
        setName('')
    }

	const addCategory = async (newCategory) => {
		const res = await fetch('/api/categories', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newCategory)
		})
        if(res.ok) getAllCategories()
	}

    useEffect(() => {
        getAllCategories()
    }, [categories])

     return (
        <section className="bg-indigo-50">
            <div className="container m-auto max-w-2xl py-10 md:py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <form onSubmit={submitForm}>
                        <h2 className="text-3xl text-center font-semibold mb-6">Add Category</h2>

                        <div className="mb-4">
                            <label htmlFor='name' className="block text-gray-700 font-bold mb-2">Category Name</label>
                            <input type="text" id="name" name="name" className="border rounded w-full py-2 px-3 mb-2"
                                placeholder="Civil Engineer" value={name} onChange={(e) => setName(e.target.value)} required
                            />
                        </div>

                        <div>
                            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 
                                rounded-full w-full focus:outline-none focus:shadow-outline" type="submit"
                            >Add Category</button>
                        </div>
                    </form>
                </div>

                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    
                    <h2 className="text-3xl font-semibold mb-6">Category Lists</h2>

                    <div className="grid gap-2 grid-cols-2">
                        {categories.map(c => (<div className='border rounded p-2' key={c.id}>{c.name}</div>))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddCategoryPage