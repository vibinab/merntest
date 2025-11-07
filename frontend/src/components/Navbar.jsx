import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar(){
  const { user, logout } = useAuth()
  return (
    <div className="card" style={{borderRadius: 0}}>
      <div className="container row space-between">
        <div className="row" style={{gap: 16}}>
          <Link to="/" className="row" style={{gap:8}}>
            <strong>📚 Library</strong>
          </Link>
          <NavLink to="/catalog">Catalog</NavLink>
          {user?.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
        </div>
        <div className="row" style={{gap: 12}}>
          {!user && <>
            <NavLink to="/login" className="btn ghost">Login</NavLink>
            <NavLink to="/register" className="btn">Register</NavLink>
          </>}
          {user && <>
            <NavLink to="/my-books">My Books</NavLink>
            <NavLink to="/me">Profile</NavLink>
            <button className="btn ghost" onClick={logout}>Logout</button>
          </>}
        </div>
      </div>
    </div>
  )
}
