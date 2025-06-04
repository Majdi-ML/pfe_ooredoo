// interfaces/Logfile.ts
import type { Etat , MonitoredBy} from './Common'
import type { Demande } from './Demande'
import type { Serveur } from './Serveur'
import type { LogfilePattern } from './LogfilePattern'

export interface Logfile {
  id: number
  ref: string
  etat_id: number
  refComposant: string
  rgSgSiCluster: string
  logfile: string
  localisation: string
  description: string
  formatLogfile: string
  separateur: string
  intervalleDePolling: string
  monitoredBy_id: number
  fourniEnAnnexe: string
  refService: string
  nomTemplate: string
  logConditions: string
  demande_id: number
  
  // Relations
  etat?: Etat
  monitoredby?: MonitoredBy
  demande?: Demande
  serveurs?: Serveur[]
  logfilespatterns?: LogfilePattern[]
}

export interface LogfileCreatePayload {
  ref: string
  etat_id: number | null
  refComposant: string
  rgSgSiCluster: string
  logfile: string
  localisation: string
  description: string
  formatLogfile: string
  separateur: string
  intervalleDePolling: string
  monitoredBy_id: number | null
  fourniEnAnnexe: string
  refService: string
  nomTemplate: string
  logConditions: string
  demande_id: number | null
  serveurs_ids?: number[] 
}