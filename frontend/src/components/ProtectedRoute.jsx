import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ children }){
  const { user, loading } = useAuth()
  const loc = useLocation()
  if(loading) return <div className="skeleton" style={{height:40}} />
  if(!user) return <Navigate to="/login" state={{ from: loc }} replace />
  return children
}
