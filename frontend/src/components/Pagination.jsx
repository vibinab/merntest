export default function Pagination({ page=1, total=1, onPage }){
  if(total <= 1) return null
  const pages = Array.from({length: total}, (_,i)=>i+1)
  return (
    <div className="row" style={{gap:8, justifyContent:'center', marginTop:16}}>
      <button className="btn ghost" disabled={page<=1} onClick={()=>onPage(page-1)}>Prev</button>
      {pages.map(p => (
        <button key={p} className="btn ghost" onClick={()=>onPage(p)} disabled={p===page}>{p}</button>
      ))}
      <button className="btn ghost" disabled={page>=total} onClick={()=>onPage(page+1)}>Next</button>
    </div>
  )
}
