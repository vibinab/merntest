import api from './api.js'

export const login = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password })
  return data
}

export const register = async (payload) => {
  const { data } = await api.post('/auth/register', payload)
  return data
}

export const me = async (token) => {
  const { data } = await api.get('/users/profile', { headers: { Authorization: `Bearer ${token}` }})
  return data
}

export const updateProfile = async (payload) => {
  const { data } = await api.put('/users/profile', payload)
  return data
}
