import api from './api.js'

export const borrowBook = async (bookId) => {
  const { data } = await api.post('/borrows', { bookId })
  return data
}

export const myActiveBorrows = async () => {
  const { data } = await api.get('/borrows/active')
  return data
}

export const returnBorrow = async (id) => {
  const { data } = await api.patch(`/borrows/${id}/return`)
  return data
}

export const borrowsAll = async (params={}) => {
  const { data } = await api.get('/borrows', { params })
  return data
}

export const overdue = async () => {
  const { data } = await api.get('/borrows/overdue')
  return data
}
