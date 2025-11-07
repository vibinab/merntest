export default function StatusBadge({ status }){
  const color = status === 'available' ? 'green' : status === 'overdue' ? 'red' : 'yellow'
  return <span className={`badge ${color}`}>{status}</span>
}
