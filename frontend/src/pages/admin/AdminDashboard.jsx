import { Routes, Route, NavLink } from 'react-router-dom'
import Overview from './Overview.jsx'
import ManageBooks from './ManageBooks.jsx'
import ManageBorrows from './ManageBorrows.jsx'
import Users from './Users.jsx'

export default function AdminDashboard(){
  return (
    <div className="card">
      <h2 style={{marginTop:0}}>Admin</h2>
      <div className="row" style={{gap:12, margin:'8px 0 16px'}}>
        <NavLink to="" end className="btn ghost">Overview</NavLink>
        <NavLink to="books" className="btn ghost">Books</NavLink>
        <NavLink to="borrows" className="btn ghost">Borrows</NavLink>
        <NavLink to="users" className="btn ghost">Users</NavLink>
      </div>
      <Routes>
        <Route index element={<Overview />} />
        <Route path="books" element={<ManageBooks />} />
        <Route path="borrows" element={<ManageBorrows />} />
        <Route path="users" element={<Users />} />
      </Routes>
    </div>
  )
}
