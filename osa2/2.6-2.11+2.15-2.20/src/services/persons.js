import axios from 'axios'
const localUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(localUrl)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(localUrl, newPerson)
    return request.then(response => response.data)
}

const update = (id, newPerson) => {
    const request = axios.put(`${localUrl}/${id}`, newPerson)
    return request.then(response => response.data)
}

const deleteEntry = (id) => {
    const request = axios.delete(`${localUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, update, deleteEntry }