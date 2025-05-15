import axios from 'axios'
const baseUrl = '/api/tasks'

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

const getByState = async (state) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}/state/${state}`, config)
  //console.log('response:',response.data)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  //console.log('newObject',newObject)
  //console.log('config',config)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, taskObject) => {
  const config = {
    headers: { Authorization: token },
  }
  //console.log('taskObject',taskObject)
  //console.log('config',config)
  const response = await axios.put(`${baseUrl}/${id}`, taskObject, config)
  return response.data
}

const erase = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { 
  getAll, getByState, create, update, setToken, erase
}