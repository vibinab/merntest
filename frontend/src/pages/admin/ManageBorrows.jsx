import { useEffect, useState } from 'react'
import { borrowsAll, overdue, returnBorrow } from '../../services/borrows.js'

export default function ManageBorrows(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')

  const load = ()=>{
    setLoading(true)
    const params = {}; if(status) params.status = status
    borrowsAll(params).then(setItems).finally(()=> setLoading(false))
  }
  useEffect(load, [status])

  return (
    <div className="card">
      <div className="row space-between" style={{marginBottom:8}}>
        <div className="row" style={{gap:8, alignItems:'center'}}>
          <div className="muted">Status</div>
          <select className="input" value={status} onChange={e=>setStatus(e.target.value)} style={{width:180}}>
            <option value="">All</option>
            <option>borrowed</option><option>returned</option><option>overdue</option>
          </select>
        </div>
        <button className="btn ghost" onClick={async ()=> setItems(await overdue())}>Show Overdue</button>
      </div>
      {loading ? <div className="skeleton" style={{height:120}} /> : (
        <table>
          <thead><tr><th>User</th><th>Book</th><th>Borrowed</th><th>Due</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {items.map(r => (
              <tr key={r._id}>
                <td>{r.user?.name}</td>
                <td>{r.book?.title}</td>
                <td>{new Date(r.borrowDate).toLocaleDateString()}</td>
                <td>{new Date(r.dueDate).toLocaleDateString()}</td>
                <td><span className={`badge ${r.status==='overdue'?'red': r.status==='borrowed'?'yellow':'green'}`}>{r.status}</span></td>
                <td><button className="btn success" onClick={()=> returnBorrow(r._id).then(load)}>Mark Return</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
