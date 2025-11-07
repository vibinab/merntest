import { useEffect, useState } from 'react'
import { listBooks } from '../services/books.js'
import SearchBar from '../components/SearchBar.jsx'
import FilterSidebar from '../components/FilterSidebar.jsx'
import BookGrid from '../components/BookGrid.jsx'
import Pagination from '../components/Pagination.jsx'

export default function Catalog(){
  const [filters, setFilters] = useState({})
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = ()=>{
    setLoading(true)
    const params = { q, page, limit: 12, ...filters }
    if(params.available === '1') params.available = true
    if(params.available === '0') params.available = false
    listBooks(params).then(d => {
      const items = d.items || d.data || d
      setBooks(items)
      setPages(d.pages || Math.ceil((d.total || items.length) / 12) || 1)
    }).finally(()=> setLoading(false))
  }

  useEffect(fetchData, [q, filters, page])

  return (
    <div className="row wrap" style={{gap:16}}>
      <FilterSidebar filters={filters} setFilters={setFilters} />
      <div style={{flex:1, minWidth:300, display:'grid', gap:12}}>
        <SearchBar onChange={setQ} />
        <div className="card">
          {loading ? <div className="skeleton" style={{height:120}} /> : <BookGrid books={books} />}
          {!loading && <Pagination page={page} total={pages} onPage={setPage} />}
        </div>
      </div>
    </div>
  )
}
