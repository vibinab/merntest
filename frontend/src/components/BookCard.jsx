import { Link } from 'react-router-dom'

export default function BookCard({ book }){
  const available = book.availableCopies > 0
  return (
    <div className="card" style={{display:'flex', flexDirection:'column', gap:8}}>
      <div style={{aspectRatio: '3/4', background: 'rgba(255,255,255,0.05)', borderRadius: 12}} className="skeleton"></div>
      <div style={{display:'flex', flexDirection:'column', gap:6}}>
        <div style={{fontWeight:600}}>{book.title}</div>
        <div className="muted">{book.author}</div>
        <div className={`badge ${available ? 'green': 'red'}`}>
          {available ? `${book.availableCopies} available` : 'Out of stock'}
        </div>
        <Link className="btn" to={`/books/${book._id}`}>View</Link>
      </div>
    </div>
  )
}
