import BookCard from './BookCard.jsx'
export default function BookGrid({ books }){
  if(!books?.length) return <div className="muted">No books found.</div>
  return <div className="grid cols-4">{books.map(b => <BookCard key={b._id} book={b} />)}</div>
}
