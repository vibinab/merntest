import { createContext, useContext, useEffect, useState } from 'react'
import { me as apiMe } from '../services/auth.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [loading, setLoading] = useState(!!token)

  useEffect(() => {
    if(!token){ setLoading(false); return }
    apiMe(token).then((u) => { setUser(u); }).catch(() => {
      setUser(null); setToken(''); localStorage.removeItem('token')
    }).finally(()=> setLoading(false))
  }, [token])

  const login = (jwt, u) => { setToken(jwt); localStorage.setItem('token', jwt); setUser(u) }
  const logout = () => { setUser(null); setToken(''); localStorage.removeItem('token') }

  return <AuthContext.Provider value={{ user, token, login, logout, loading }}>
    {children}
  </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
