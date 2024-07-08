import axios from 'axios'

const baseUrl = '/api/tests'

const getTest = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`, {
    withCredentials: true
  })
  return response.data
}

export default {
  getTest,
}