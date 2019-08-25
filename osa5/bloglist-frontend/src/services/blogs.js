import axios from 'axios';
const baseUrl = '/api/blogs'

let token = ''

const setToken = (usertoken) => {
  token = 'bearer ' + usertoken
}

const getToken = () => {
  if(token) {
    return {
      headers: { Authorization: token }
    }
  } else {
    console.log('no token')
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, getToken())
  return response.data
}

export default { getAll, create, setToken }