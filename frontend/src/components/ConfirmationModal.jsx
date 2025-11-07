export default function ConfirmationModal({ open, title='Are you sure?', description, onConfirm, onCancel }){
  if(!open) return null
  return (
    <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'grid', placeItems:'center'}}>
      <div className="card" style={{maxWidth:420}}>
        <div style={{fontWeight:700, marginBottom:8}}>{title}</div>
        <div className="muted" style={{marginBottom:12}}>{description}</div>
        <div className="row space-between">
          <button className="btn ghost" onClick={onCancel}>Cancel</button>
          <button className="btn danger" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  )
}
