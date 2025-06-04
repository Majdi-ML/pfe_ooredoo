export interface User {
  id: number
  username: string
  email: string
  role_id: number
  support_id: number | null
  created_at?: string
  updated_at?: string
}

export interface AuthResponse {
  message: string
  user: {
    id: number
    username: string
    email: string
    role_id: number
    role: string
    support_id: number | null
  }
  token: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface LogoutResponse {
  message: string
}

export interface LDAPErrorResponse {
  message: string
  error?: string
}