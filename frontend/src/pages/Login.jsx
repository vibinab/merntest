import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { login as apiLogin, me as apiMe } from '../services/auth.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()
  const loc = useLocation()
  const { login } = useAuth()

  const submit = async (e)=>{
    e.preventDefault()
    setError(''); setLoading(true)
    try{
      const { token } = await apiLogin(email, password)
      const user = await apiMe(token)
      login(token, user)
      const to = loc.state?.from?.pathname || '/'
      nav(to, { replace: true })
    }catch(e){
      setError(e?.response?.data?.message || 'Invalid credentials')
    }finally{ setLoading(false) }
  }

  return (
    <form className="card" onSubmit={submit} style={{maxWidth:420, margin:'0 auto'}}>
      <h2 style={{marginTop:0}}>Login</h2>
      {error && <div className="badge red" style={{marginBottom:8}}>{error}</div>}
      <div style={{display:'grid', gap:8}}>
        <input className="input" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={6} />
        <button className="btn" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </div>
    </form>
  )
}
