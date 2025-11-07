import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { myActiveBorrows, returnBorrow } from '../services/borrows.js'

export default function MyBooks(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const load = ()=>{
    setLoading(true)
    myActiveBorrows().then(setItems).finally(()=> setLoading(false))
  }
  useEffect(load, [])

  const onReturn = async (id)=>{
    await returnBorrow(id)
    load()
  }

  return (
    <div className="card">
      <h2 style={{marginTop:0}}>My Books</h2>
      {loading ? <div className="skeleton" style={{height:120}} /> : (
        <table>
          <thead><tr><th>Title</th><th>Due</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {items.map(r => (
              <tr key={r._id}>
                <td>{r.book?.title}</td>
                <td>{dayjs(r.dueDate).format('DD MMM, YYYY')}</td>
                <td><span className={`badge ${r.status==='overdue'?'red': r.status==='borrowed'?'yellow':'green'}`}>{r.status}</span></td>
                <td><button className="btn success" onClick={()=>onReturn(r._id)}>Return</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
