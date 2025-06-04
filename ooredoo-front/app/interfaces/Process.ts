// interfaces/Process.ts
import type { Etat ,MonitoredBy ,Criticite} from './Common'
import type { Demande } from './Demande'
import type { Serveur } from './Serveur'

export interface Process {
  id: number
  ref: string
  etat_id: number
  refComposant: string
  process: string
  criticite_id: number
  messageAlarme: string
  intervalleDePolling: string
  objet: string
  nomTemplate: string
  monitoredBy_id: number
  demande_id: number
  
  // Relations
  etat?: Etat
  criticite?: Criticite
  monitoredby?: MonitoredBy
  demande?: Demande
  serveurs?: Serveur[]

}

export interface ProcessCreatePayload {
  ref: string
  etat_id: number
  refComposant: string
  process: string
  criticite_id: number
  messageAlarme: string
  intervalleDePolling: string
  objet: string
  nomTemplate: string
  monitoredBy_id: number
  demande_id: number
  serveurs_ids?: number
}