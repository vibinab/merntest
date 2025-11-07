import api from './api.js'

export const listUsers = async () => (await api.get('/users')).data
export const toggleActive = async (id) => (await api.patch(`/users/${id}/toggle`)).data
export const userStats = async (id) => (await api.get(`/users/${id}/stats`)).data
