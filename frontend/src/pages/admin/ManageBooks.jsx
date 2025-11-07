import { useEffect, useState } from 'react'
import { listBooks, addBook, updateBook, removeBook, updateStock } from '../../services/books.js'

export default function ManageBooks() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    title: '',
    author: '',
    isbn: '',
    category: 'Fiction',
    totalCopies: 1,
  })
  const [editingId, setEditingId] = useState(null) // ✅ Track editing book ID
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const load = () => {
    setLoading(true)
    listBooks({ limit: 100 })
      .then(d => setItems(d.items || d))
      .catch(() => setError('Failed to load books.'))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const createOrUpdate = async e => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      if (editingId) {
        // ✅ Update existing book
        await updateBook(editingId, form)
        setSuccess('Book updated successfully ✅')
        setEditingId(null)
      } else {
        // ✅ Add new book
        await addBook(form)
        setSuccess('Book added successfully ✅')
      }

      setForm({ title: '', author: '', isbn: '', category: 'Fiction', totalCopies: 1 })
      load()
    } catch (err) {
      console.error('Book save error:', err)
      setError(err?.response?.data?.message || 'Failed to save book. Please check your input.')
    }
  }

  const stock = async b => {
    const qty = prompt('New stock quantity', b.totalCopies)
    if (qty) {
      try {
        await updateStock(b._id, Number(qty))
        setSuccess('Stock updated successfully ✅')
      } catch {
        setError('Failed to update stock.')
      }
      load()
    }
  }

  const edit = b => {
    setForm({
      title: b.title,
      author: b.author,
      isbn: b.isbn,
      category: b.category,
      totalCopies: b.totalCopies,
    })
    setEditingId(b._id)
    setError('')
    setSuccess('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setForm({ title: '', author: '', isbn: '', category: 'Fiction', totalCopies: 1 })
  }

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <form className="card" onSubmit={createOrUpdate} style={{ display: 'grid', gap: 8 }}>
        <div style={{ fontWeight: 600 }}>
          {editingId ? 'Edit Book' : 'Add Book'}
        </div>

        {/* ✅ Error and success message */}
        {error && <div style={{ color: 'red', fontSize: 14 }}>{error}</div>}
        {success && <div style={{ color: 'green', fontSize: 14 }}>{success}</div>}

        <div className="row" style={{ gap: 8 }}>
          <input
            className="input"
            placeholder="Title"
            value={form.title}
            onChange={e => set('title', e.target.value)}
            required
          />
          <input
            className="input"
            placeholder="Author"
            value={form.author}
            onChange={e => set('author', e.target.value)}
            required
          />
          <input
            className="input"
            placeholder="ISBN"
            value={form.isbn}
            onChange={e => set('isbn', e.target.value)}
            required
          />
        </div>

        <div className="row" style={{ gap: 8 }}>
          <select
            className="input"
            value={form.category}
            onChange={e => set('category', e.target.value)}
          >
            <option>Fiction</option>
            <option>Non-Fiction</option>
            <option>Science</option>
            <option>Technology</option>
            <option>History</option>
          </select>
          <input
            className="input"
            placeholder="Total Copies"
            type="number"
            min="1"
            value={form.totalCopies}
            onChange={e => set('totalCopies', e.target.value)}
          />
          <div className="row" style={{ gap: 8 }}>
            <button className="btn">{editingId ? 'Update' : 'Add'}</button>
            {editingId && (
              <button
                type="button"
                className="btn ghost"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="card">
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Books</div>
        {loading ? (
          <div className="skeleton" style={{ height: 120 }} />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th><th>Author</th><th>Available</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(b => (
                <tr key={b._id}>
                  <td>{b.title}</td>
                  <td>{b.author}</td>
                  <td>{b.availableCopies} / {b.totalCopies}</td>
                  <td className="row" style={{ gap: 8 }}>
                    <button className="btn ghost" onClick={() => stock(b)}>Stock</button>
                    <button className="btn ghost" onClick={() => edit(b)}>Edit</button>
                    <button
                      className="btn danger"
                      onClick={() => {
                        removeBook(b._id)
                          .then(() => setSuccess('Book deleted ✅'))
                          .catch(() => setError('Failed to delete book'))
                          .finally(load)
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
