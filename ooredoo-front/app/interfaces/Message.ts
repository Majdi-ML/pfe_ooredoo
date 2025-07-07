import type { User } from './User'

export interface Message {
  id: number
  discussion_id: number
  user_id: number
  content: string
  created_at: string
  updated_at: string
  user?: User
}