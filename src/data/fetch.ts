const fetchData = async (url: string) => {
	const response = await fetch(url)

	if (!response) throw new Error('Failed to fetch data')

	if (response.status !== 200) {
		if (response.status === 404)
			throw new Error(`Failed to fetch data: Resource not found`)
		throw new Error(`Failed to fetch data with status: ${response.status}`)
	}

	return response.json()
}

export const getAllData = async () => {
	return fetchData(`http://localhost:3000/api/front/`)
}

export const getAllSubpageData = async () => {
	return fetchData(`http://localhost:3000/api/subpage/`)
}

export const getSubpageDataById = async (id: string) => {
	if (!id) throw new Error('Failed to fetch data: ID is not provided')
	return fetchData(`http://localhost:3000/api/subpage/${id}`)
}

export const getAllContactData = async () => {
	return fetchData(`http://localhost:3000/api/contact/`)
}

export const getContactDataById = async (id: string) => {
	if (!id) throw new Error('Failed to fetch data: ID is not provided')
	return fetchData(`http://localhost:3000/api/contacts/${id}`)
}
