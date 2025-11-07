import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBook } from '../services/books.js'
import { borrowBook } from '../services/borrows.js'

export default function BookDetails(){
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')

  useEffect(()=>{
    getBook(id).then(setBook).finally(()=> setLoading(false))
  }, [id])

  if(loading) return <div className="skeleton" style={{height:120}} />
  if(!book) return <div className="muted">Book not found.</div>

  const borrow = async ()=>{
    try{
      await borrowBook(book._id)
      setMsg('Borrowed successfully!')
    }catch(e){ setMsg(e?.response?.data?.message || 'Failed to borrow') }
  }

  return (
    <div className="row wrap" style={{gap:16}}>
      <div className="card" style={{width:300, height:400}}></div>
      <div className="card" style={{flex:1}}>
        <h2 style={{marginTop:0}}>{book.title}</h2>
        <div className="muted">by {book.author}</div>
        <div className="row" style={{gap:8, margin:'8px 0'}}>
          <span className={`badge ${book.availableCopies>0?'green':'red'}`}>
            {book.availableCopies>0 ? `${book.availableCopies} available` : 'Unavailable'}
          </span>
        </div>
        <p>{book.description || 'No description provided.'}</p>
        <div className="row" style={{gap:8}}>
          <button className="btn" disabled={book.availableCopies<=0} onClick={borrow}>Borrow</button>
        </div>
        {msg && <div style={{marginTop:10}} className="muted">{msg}</div>}
      </div>
    </div>
  )
}
