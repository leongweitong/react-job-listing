import React, {useState, useEffect} from 'react'

const Categories = ({categories}) => {
    return (
        <section className="bg-gray-100 px-4 py-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold mb-6 text-center">Available Job Categories</h2>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {categories.map(category => 
                        <div key={category.id} className="bg-white hover:bg-indigo-500 hover:text-white rounded-xl shadow-md p-2">{category.name} - {category.jobCount} jobs</div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Categories