import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/tests'

const getTest = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default {
  getTest,
}