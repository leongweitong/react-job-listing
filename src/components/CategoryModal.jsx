import React from 'react'

const CategoryModal = ({ isVisible, category, onClose, onUpdate, setCategoryName }) => {

    if (!isVisible) return null

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded p-4 mx-4 md:mx-0 w-full md:w-1/3">
                <h2 className="text-2xl mb-4">Update Category</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Category Name</label>
                    <input
                        type="text"
                        className="border rounded w-full py-2 px-3"
                        value={category.name}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
                        onClick={onUpdate}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CategoryModal