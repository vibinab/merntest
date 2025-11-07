import { useEffect, useState } from 'react'
import { stats, popularBooks, activeUsers } from '../../services/dashboard.js'

export default function Overview(){
  const [data, setData] = useState(null)
  const [popular, setPopular] = useState([])
  const [active, setActive] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    Promise.all([stats(), popularBooks(), activeUsers()])
      .then(([s,p,a])=>{ setData(s); setPopular(p); setActive(a) })
      .finally(()=> setLoading(false))
  }, [])

  if(loading) return <div className="skeleton" style={{height:120}} />

  return (
    <div style={{display:'grid', gap:16}}>
      <div className="row wrap" style={{gap:12}}>
        <div className="card" style={{flex:'1 1 220px'}}><div className="muted">Total Books</div><div style={{fontSize:28, fontWeight:700}}>{data?.totalBooks ?? '-'}</div></div>
        <div className="card" style={{flex:'1 1 220px'}}><div className="muted">Total Borrows</div><div style={{fontSize:28, fontWeight:700}}>{data?.totalBorrows ?? '-'}</div></div>
        <div className="card" style={{flex:'1 1 220px'}}><div className="muted">Active Users</div><div style={{fontSize:28, fontWeight:700}}>{data?.activeUsers ?? '-'}</div></div>
        <div className="card" style={{flex:'1 1 220px'}}><div className="muted">Overdue</div><div style={{fontSize:28, fontWeight:700}}>{data?.overdue ?? '-'}</div></div>
      </div>
      <div className="row wrap" style={{gap:12}}>
        <div className="card" style={{flex:'2 1 420px'}}>
          <div style={{fontWeight:600, marginBottom:8}}>Popular Books</div>
          <table><thead><tr><th>Title</th><th>Borrows</th></tr></thead><tbody>
            {popular.map(x=> <tr key={x._id}><td>{x.title}</td><td>{x.count}</td></tr>)}
          </tbody></table>
        </div>
        <div className="card" style={{flex:'1 1 320px'}}>
          <div style={{fontWeight:600, marginBottom:8}}>Active Users</div>
          <table><thead><tr><th>Name</th><th>Active</th></tr></thead><tbody>
            {active.map(x=> <tr key={x._id}><td>{x.name}</td><td>{x.activeBorrows}</td></tr>)}
          </tbody></table>
        </div>
      </div>
    </div>
  )
}
