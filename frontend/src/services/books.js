import api from './api.js'

export const listBooks = async (params={}) => {
  const { data } = await api.get('/books', { params })
  return data
}

export const getBook = async (id) => {
  const { data } = await api.get(`/books/${id}`)
  return data
}

export const searchBooks = async (q) => {
  const { data } = await api.get('/books/search', { params: { q } })
  return data
}

export const addBook = async (payload) => {
  const { data } = await api.post('/books', payload)
  return data
}

export const updateBook = async (id, payload) => {
  const { data } = await api.put(`/books/${id}`, payload)
  return data
}

export const removeBook = async (id) => {
  const { data } = await api.delete(`/books/${id}`)
  return data
}

export const updateStock = async (id, qty) => {
  const { data } = await api.patch(`/books/${id}/stock`, { quantity: qty })
  return data
}
