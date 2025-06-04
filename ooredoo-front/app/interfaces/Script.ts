// interfaces/Script.ts
import type { Etat , Criticite ,MonitoredBy} from './Common'
import type { Demande } from './Demande'
import type { Serveur } from './Serveur'

export interface Script {
  id: number
  ref: string
  etat_id: number
  refComposant: string
  rgSgSiCluster: string
  script: string
  codeErreur: string
  criticite_id: number
  description: string
  instructions: string
  monitoredBy_id: number
  refService: string
  demande_id: number
  
  // Relations
  etat?: Etat
  criticite?: Criticite
  monitoredby?: MonitoredBy
  demande?: Demande
  serveurs?: Serveur[]
}

export interface ScriptCreatePayload {
  ref: string
  etat_id: number
  refComposant: string
  rgSgSiCluster: string
  script: string
  codeErreur: string
  criticite_id: number
  description: string
  instructions: string
  monitoredBy_id: number
  refService: string
  demande_id: number
  serveurs_ids?: number
}