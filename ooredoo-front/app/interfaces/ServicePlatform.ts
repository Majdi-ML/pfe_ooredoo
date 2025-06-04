// interfaces/ServicePlatform.ts
import type { User } from './User'
import type { Support } from './Common' // Assurez-vous que le chemin est correct
export interface ServicePlatform {
  id: number
  user_id: number | null
  support_id: number | null
  nom: string
  created_at: string
  updated_at: string
  
  // Relations
  user?: User
  support?: Support // Si vous avez une interface Support
}