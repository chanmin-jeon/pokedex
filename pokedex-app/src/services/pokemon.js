import axios from 'axios'

const baseURL = 'https://pokeapi.co/api/v2/pokemon'

const getAll = () => {
    const request = axios.get(`${baseURL}/?limit=2000`)
    return request.then(response => response.data)
}

export default {getAll}