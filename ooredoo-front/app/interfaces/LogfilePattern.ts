// interfaces/LogfilePattern.ts
import type { Etat , Criticite} from './Common'
import type { Logfile } from './Logfile'
import type { Demande } from './Demande'

export interface LogfilePattern {
  id: number
  nRef: number
  ref: string
  etat_id: number
  signification: string
  identification: string
  criticite_id: number
  messageAlarme: string
  instructions: string
  performAction: string
  acquittement: string
  complementsInformations: string
  refService: string
  objet: string
  logfile_id: number
  demande_id: number
  
  // Relations
  etat?: Etat
  criticite?: Criticite
  logfile?: Logfile
  demande?: Demande
}

export interface LogfilePatternCreatePayload {
  nRef: number
  ref: string
  etat_id: number
  signification: string
  identification: string
  criticite_id: number
  messageAlarme: string
  instructions: string
  performAction: string
  acquittement: string
  complementsInformations: string
  refService: string
  objet: string
  logfile_id: number
  demande_id: number
}