import { useEffect, useState } from 'react'
import { listBooks } from '../services/books.js'
import BookGrid from '../components/BookGrid.jsx'

export default function Home(){
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{ 
    listBooks({ limit: 8 }).then(d => setBooks(d.items || d)).finally(()=> setLoading(false))
  }, [])

  return (
    <div style={{display:'grid', gap:16}}>
      <div className="row space-between">
        <div>
          <h2 style={{margin:'6px 0'}}>Welcome to the Library</h2>
          <div className="muted">Discover, borrow, and track your reading.</div>
        </div>
      </div>
      <div className="card">
        <div style={{fontWeight:700, marginBottom:12}}>Featured</div>
        {loading ? <div className="skeleton" style={{height:120}} /> : <BookGrid books={books} />}
      </div>
    </div>
  )
}
