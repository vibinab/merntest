import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register as apiRegister, login as apiLogin, me as apiMe } from '../services/auth.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register(){
  const [form, setForm] = useState({ name:'', email:'', password:'' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()
  const { login } = useAuth()

  const submit = async (e)=>{
    e.preventDefault()
    setError(''); setLoading(true)
    try{
      await apiRegister(form)
      const { token } = await apiLogin(form.email, form.password)
      const user = await apiMe(token)
      login(token, user)
      nav('/', { replace: true })
    }catch(e){
      setError(e?.response?.data?.message || 'Registration failed')
    }finally{ setLoading(false) }
  }

  const set = (k,v)=> setForm(prev=>({ ...prev, [k]: v }))

  return (
    <form className="card" onSubmit={submit} style={{maxWidth:480, margin:'0 auto'}}>
      <h2 style={{marginTop:0}}>Create account</h2>
      {error && <div className="badge red" style={{marginBottom:8}}>{error}</div>}
      <div style={{display:'grid', gap:8}}>
        <input className="input" placeholder="Name" value={form.name} onChange={e=>set('name', e.target.value)} required />
        <input className="input" placeholder="Email" type="email" value={form.email} onChange={e=>set('email', e.target.value)} required />
        <input className="input" placeholder="Password" type="password" value={form.password} onChange={e=>set('password', e.target.value)} required minLength={6} />
        <button className="btn" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
      </div>
    </form>
  )
}
