import { useEffect, useState } from 'react'
import { listUsers, toggleActive, userStats } from '../../services/users.js'

export default function Users(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({})

  const load = ()=>{
    setLoading(true)
    listUsers().then(async (users)=>{
      const withStats = {}
      for(const u of users){
        try{ withStats[u._id] = await userStats(u._id) }catch{ withStats[u._id] = {} }
      }
      setStats(withStats); setItems(users)
    }).finally(()=> setLoading(false))
  }
  useEffect(load, [])

  return (
    <div className="card">
      <div style={{fontWeight:600, marginBottom:8}}>Users</div>
      {loading ? <div className="skeleton" style={{height:120}} /> : (
        <table>
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Active</th><th>Stats</th><th></th></tr></thead>
          <tbody>
            {items.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.isActive ? 'Yes' : 'No'}</td>
                <td>{stats[u._id]?.booksBorrowed ?? 0} borrowed</td>
                <td className="row" style={{gap:8}}>
                  <button className="btn ghost" onClick={()=> toggleActive(u._id).then(load)}>{u.isActive ? 'Deactivate' : 'Activate'}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
