// interfaces/Url.ts
import type { Etat , Criticite , MonitoredBy } from './Common'
import type { Demande } from './Demande'
import type { Serveur } from './Serveur'

export interface Url {
  id: number
  ref: string
  etat_id: number
  refComposant: string
  rgSgSiCluster: string
  url: string
  performAction: string
  criticite_id: number
  messageAlarme: string
  instructions: string
  intervalleDePolling: string
  refService: string
  objet: string
  monitoredBy_id: number
  nomTemplate: string
  demande_id: number
  
  // Relations
  etat?: Etat
  criticite?: Criticite
  monitoredby?: MonitoredBy
  demande?: Demande
  serveurs?: Serveur[]
}

export interface UrlCreatePayload {
  ref: string
  etat_id: number
  refComposant: string
  rgSgSiCluster: string
  url: string
  performAction: string
  criticite_id: number
  messageAlarme: string
  instructions: string
  intervalleDePolling: string
  refService: string
  objet: string
  monitoredBy_id: number
  nomTemplate: string
  demande_id: number
  serveurs_ids?: number
}