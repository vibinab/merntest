import { useEffect, useState } from 'react'

export default function SearchBar({ onChange, placeholder='Search books...' }){
  const [q, setQ] = useState('')
  useEffect(()=>{
    const t = setTimeout(()=> onChange?.(q), 350)
    return ()=> clearTimeout(t)
  }, [q])
  return (
    <input className="input" placeholder={placeholder} value={q} onChange={e=>setQ(e.target.value)} />
  )
}
