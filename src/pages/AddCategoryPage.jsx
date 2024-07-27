import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify'
import CategoryModal from '../components/CategoryModal'

const AddCategoryPage = () => {
    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)

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

    const handleShowModal = (category) => {
        setSelectedCategory(category)
        setIsModalVisible(true)
    }

    const handleCloseModal = () => {
        setIsModalVisible(false)
        setSelectedCategory(null)
    }

    const handleUpdateCategory = async () => {
        const res = await fetch(`/api/categories/${selectedCategory.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedCategory)
        })
        if (res.ok) {
            toast.success('Category Updated Successfully.')
            getAllCategories()
            handleCloseModal()
        }
    }

     return (
        <section className="bg-indigo-50">
            <div className="container m-auto max-w-2xl py-10 md:py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4">
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

                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4">
                    <h2 className="text-3xl font-semibold mb-6">Category Lists</h2>
                    <div className="grid gap-2 grid-cols-2">
                        {categories.map(c => (<div onClick={() => handleShowModal(c)} className='border rounded p-2 cursor-pointer' key={c.id}>{c.name}</div>))}
                    </div>
                </div>

            </div>

            <CategoryModal isVisible={isModalVisible} category={selectedCategory} onClose={handleCloseModal} 
                onUpdate={handleUpdateCategory} setCategoryName={(name) => setSelectedCategory({ ...selectedCategory, name })} 
            />
        </section>
    )
}

export default AddCategoryPage