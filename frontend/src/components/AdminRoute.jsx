import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function AdminRoute({ children }){
  const { user, loading } = useAuth()
  if(loading) return <div className="skeleton" style={{height:40}} />
  if(!user || user.role !== 'admin') return <Navigate to="/" replace />
  return children
}
