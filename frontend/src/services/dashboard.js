import api from './api.js'

export const stats = async () => (await api.get('/dashboard/stats')).data
export const popularBooks = async () => (await api.get('/dashboard/popular-books')).data
export const activeUsers = async () => (await api.get('/dashboard/active-users')).data
