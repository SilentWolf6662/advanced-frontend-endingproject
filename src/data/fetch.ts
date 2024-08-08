export const getAllData = async () => {
    const data = await fetch(`http://localhost:3000/api/front/`)

    if (!data)
        throw new Error('Failed to fetch data')

    if (data.status !== 200)
        throw new Error(`Failed to fetch data with status: ${data.status}`)

    return data.json()
}

export const getAllSubpageData = async () => {
    const data = await fetch(`http://localhost:3000/api/subpage/`)

    if (!data)
        throw new Error('Failed to fetch data')

    if (data.status !== 200)
        throw new Error(`Failed to fetch data with status: ${data.status}`)

    return data.json()
}

export const getSubpageDataById = async (id: string) => {
    if (!id) throw new Error('Failed to fetch data: ID is not provided')
    const data = await fetch(`http://localhost:3000/api/subpage/${id}`)

    if (!data) throw new Error('Failed to fetch data')

    if (data.status !== 200)
        if (data.status === 404) throw new Error(`Failed to fetch data: Subpage with ID ${id} was not found`)
        else throw new Error(`Failed to fetch data with status: ${data.status}`)

    return data.json()
}

export const getAllContactData = async () => {
    const data = await fetch(`http://localhost:3000/api/contact/`)

    if (!data)
        throw new Error('Failed to fetch data')

    if (data.status !== 200)
        throw new Error(`Failed to fetch data with status: ${data.status}`)

    return data.json()
}

export const getContactDataById = async (id: string) => {
    if (!id) throw new Error('Failed to fetch data: ID is not provided')
    const data = await fetch(`http://localhost:3000/api/contacts/${id}`)

    if (!data) throw new Error('Failed to fetch data')

    if (data.status !== 200)
        if (data.status === 404) throw new Error(`Failed to fetch data: Contact with ID ${id} was not found`)
        else throw new Error(`Failed to fetch data with status: ${data.status}`)

    return data.json()
}