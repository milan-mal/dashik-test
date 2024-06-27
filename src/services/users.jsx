import axios from 'axios'

const baseUrl = '/api/users'

const postUser = async (credential) => {
  const req = await axios.post(`${baseUrl}`, { credential: credential })
  const res = req.data
  return res
}

export default {
  postUser,
}