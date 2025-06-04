// interfaces/Demande.ts
import type { Status } from './Common'
import type { User } from './User'
import type { ServicePlatform } from './ServicePlatform'
import type { Cluster } from './Cluster'
import type { Serveur } from './Serveur'
import type { Logfile } from './Logfile'
import type { Process } from './Process'
import type { RequeteSQL } from './RequeteSQL'
import type { Script } from './Script'
import type { Url } from './Url'
import type { TrapSnmp } from './TrapSnmp'
import type { LogfilePattern } from './LogfilePattern'

export interface Demande {
  id: number
  ref: string
  description: string
  status_id: number
  user_id: number | null
  serviceplatfom_id: number | null
  created_at: string
  updated_at: string
  
  // Relations
  status?: Status
  user?: User
  serviceplatfom?: ServicePlatform
  clusters?: Cluster[]
  serveurs?: Serveur[]
  logfiles?: Logfile[]
  processes?: Process[]
  requetessqls?: RequeteSQL[]
  scripts?: Script[]
  urls?: Url[]
  trapssnmps?: TrapSnmp[]
  logfilespatterns?: LogfilePattern[]
}

export interface DemandeCreatePayload {
  
  description: string
  status_id: number
  serviceplatfom_id: number | null
}