# Library Frontend (React + Vite)

Frontend for the Library Management System (per the MERN test).

## Quick Start
```bash
npm install
npm run dev
```

Configure API base URL in `.env`:
```env
VITE_API_BASE=http://localhost:5000/api
```

## Features covered
- Pages: Home, Catalog, Book Details, Login/Register, My Books, Profile
- Admin: Overview, Manage Books, Manage Borrows, Users
- Components: BookCard, BookGrid, SearchBar (debounced), FilterSidebar, Pagination,
  Navbar, ProtectedRoute, AdminRoute, Loading/Errors, ConfirmationModal, StatusBadge
- Axios instance with auth token and interceptors
- Simple, responsive UI (dark theme), skeleton loaders
- Client-side validation & disabled submit states on auth forms

> This scaffold expects the backend endpoints from the test spec.
