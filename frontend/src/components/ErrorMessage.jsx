export default function ErrorMessage({ message }){
  if(!message) return null
  return <div className="card" style={{border:'1px solid rgba(255,0,0,0.25)'}}>{message}</div>
}
