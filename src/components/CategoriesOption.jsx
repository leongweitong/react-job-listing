import React from 'react'

const CategoriesOption = ({categories = [], parentCallback}) => {
    const optionSelect = (e) => {
        parentCallback(e.target.value);
    }
    
    return (
        <div className='flex justify-center mb-4'>
            <select className='py-2 px-4 focus:outline-none focus:border-indigo-500' onChange={optionSelect}>
                <option key="0" value="all">All</option>
                {categories.map(c => {
                return (<option key={c.id} value={c.id}>{c.name}</option>)
                })}
            </select>
        </div>
    )
}

export default CategoriesOption