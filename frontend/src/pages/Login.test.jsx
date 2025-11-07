import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Login from './Login.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { login as apiLogin, me as apiMe } from '../services/auth.js'
import { useNavigate, useLocation } from 'react-router-dom'

// Mock modules
vi.mock('../services/auth.js')
vi.mock('../context/AuthContext.jsx')
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
  }
})

describe('Login Page', () => {
  const mockLogin = vi.fn()
  const mockNavigate = vi.fn()

  beforeEach(() => {
    useAuth.mockReturnValue({ login: mockLogin })
    useNavigate.mockReturnValue(mockNavigate)
    useLocation.mockReturnValue({ state: { from: { pathname: '/dashboard' } } })
    vi.clearAllMocks()
  })

  it('renders inputs and button', () => {
    render(<Login />)
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('shows error for invalid login', async () => {
    apiLogin.mockRejectedValueOnce({
      response: { data: { message: 'Invalid credentials' } },
    })

    render(<Login />)

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@x.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrong' },
    })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
    })
  })

  it('calls login, apiMe, and navigates on success', async () => {
    apiLogin.mockResolvedValueOnce({ token: 'mockToken' })
    apiMe.mockResolvedValueOnce({ name: 'John' })

    render(<Login />)

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'user@test.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '123456' },
    })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(apiLogin).toHaveBeenCalledWith('user@test.com', '123456')
      expect(apiMe).toHaveBeenCalledWith('mockToken')
      expect(mockLogin).toHaveBeenCalledWith('mockToken', { name: 'John' })
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true })
    })
  })
})
