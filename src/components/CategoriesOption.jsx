import React from 'react'

const CategoriesOption = ({categories}) => {
    const optionSelect = (e) => {
        console.log(e.target.value)
    }
    
    return (
        <div className='bg-blue-50 px-4 py-10'>
            <div className="container-xl lg:container m-auto">
                <div className='flex justify-center'>
                <select className='py-2 px-4 focus:outline-none focus:border-indigo-500' onChange={optionSelect}>
                    <option key="0" value="0">All</option>
                    {categories.map(c => {
                    return (<option key={c.id} value={c.id}>{c.name}</option>)
                    })}
                </select>
                </div>
            </div>
        </div>
    )
}

export default CategoriesOption