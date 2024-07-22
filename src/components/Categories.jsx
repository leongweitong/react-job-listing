import React, {useState, useEffect} from 'react'

const Categories = () => {
    const [categoriesWithJobCount, setCategoriesWithJobCount] = useState([]);

    useEffect(() => {
        const getAvailableCategories = async () => {
            try {
                const res = await Promise.allSettled([fetch('/api/jobs'), fetch('/api/categories')]);
                const jobsResponse = res[0];
                const categoriesResponse = res[1];

                if (jobsResponse.status === 'fulfilled' && categoriesResponse.status === 'fulfilled') {
                    const jobsData = await jobsResponse.value.json();
                    const categoriesData = await categoriesResponse.value.json();

                    // Create a map to count jobs for each category
                    const jobCountByCategory = jobsData.reduce((acc, job) => {
                        acc[job.categoryId] = (acc[job.categoryId] || 0) + 1;
                        return acc;
                    }, {});

                    // Filter categories that are used in jobs and include job count
                    const categoriesWithJobCount = categoriesData
                        .filter(category => jobCountByCategory[category.id])
                        .map(category => ({
                            ...category,
                            jobCount: jobCountByCategory[category.id],
                        }));

                    setCategoriesWithJobCount(categoriesWithJobCount);
                }
            } catch (error) {
                console.error('Error during get available job categories:', error);
            }
        };

        getAvailableCategories();
    }, []);

    return (
        <section className="bg-gray-100 px-4 py-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold mb-6 text-center">Available Job Categories</h2>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {categoriesWithJobCount.map(category => 
                        <div key={category.id} className="bg-white hover:bg-indigo-500 hover:text-white rounded-xl shadow-md p-2">{category.name} - {category.jobCount} jobs</div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Categories