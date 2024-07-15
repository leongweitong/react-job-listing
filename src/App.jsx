import React from 'react'

const App = () => {
	const name = 'john'
	const x = 10
	const y =20

	return (
		<>
			<h1 className="text-3xl font-normal underline">
				Hello {name}!
			</h1>
			<p>sum of {x} and {y} is {x + y}</p>
		</>
	)
}

export default App