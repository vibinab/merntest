export default function FilterSidebar({ filters, setFilters }){
  const set = (k,v)=> setFilters(prev => ({ ...prev, [k]: v }))
  return (
    <div className="card" style={{minWidth:260}}>
      <div style={{fontWeight:600, marginBottom:8}}>Filters</div>
      <div style={{display:'grid', gap:12}}>
        <div>
          <div className="muted" style={{marginBottom:6}}>Category</div>
          <select value={filters.category||''} onChange={e=>set('category', e.target.value)}>
            <option value="">All</option>
            <option>Fiction</option><option>Non-Fiction</option><option>Science</option>
            <option>Technology</option><option>History</option>
          </select>
        </div>
        <div>
          <div className="muted" style={{marginBottom:6}}>Language</div>
          <select value={filters.language||''} onChange={e=>set('language', e.target.value)}>
            <option value="">Any</option>
            <option>English</option><option>Hindi</option><option>Tamil</option><option>Telugu</option>
          </select>
        </div>
        <div>
          <div className="muted" style={{marginBottom:6}}>Availability</div>
          <select value={filters.available||''} onChange={e=>set('available', e.target.value)}>
            <option value="">All</option>
            <option value="1">Available</option>
            <option value="0">Unavailable</option>
          </select>
        </div>
      </div>
    </div>
  )
}
