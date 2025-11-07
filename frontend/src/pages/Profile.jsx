import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { updateProfile } from '../services/auth.js'

export default function Profile(){
  const { user } = useAuth()
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '', address: user?.address || '' })
  const [msg, setMsg] = useState('')

  const set = (k,v)=> setForm(prev=>({ ...prev, [k]: v }))

  const save = async ()=>{
    await updateProfile(form); setMsg('Saved!')
  }

  return (
    <div className="card" style={{maxWidth:640}}>
      <h2 style={{marginTop:0}}>Profile</h2>
      <div className="row" style={{gap:12}}>
        <input className="input" placeholder="Name" value={form.name} onChange={e=>set('name', e.target.value)} />
        <input className="input" placeholder="Phone" value={form.phone} onChange={e=>set('phone', e.target.value)} />
      </div>
      <div style={{marginTop:8}}>
        <textarea className="input" rows="4" placeholder="Address" value={form.address} onChange={e=>set('address', e.target.value)} />
      </div>
      <div style={{marginTop:12}} className="row space-between">
        <div className="muted">{msg}</div>
        <button className="btn" onClick={save}>Save</button>
      </div>
    </div>
  )
}
