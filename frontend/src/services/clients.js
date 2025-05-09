import axios from 'axios'
const baseUrl = '/api/clients'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const getOne = async (id) => {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.get(`${baseUrl}/${id}`, config)
    return response.data
  }

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  
  const response = await axios.post(baseUrl, newObject, config)
  console.log('RESPONSE',response.data)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { 
  getAll, getOne, create, update, setToken 
}