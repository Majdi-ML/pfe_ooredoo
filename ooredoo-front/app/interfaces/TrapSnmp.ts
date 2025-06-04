// interfaces/TrapSnmp.ts
import type { Etat , Criticite , VersionSNMP } from './Common'
import type { Demande } from './Demande'
import type { Serveur } from './Serveur'

export interface TrapSnmp {
  id: number
  ref: string
  etat_id: number
  refComposant: string
  signification: string
  versionSnmp_id: number
  oid: string
  specificTrap: string
  variableBinding: string
  criticite_id: number
  messageAlarme: string
  instructions: string
  acquittement: string
  mibAssocie: string
  objet: string
  compelementInformation: string
  demande_id: number
  
  // Relations
  etat?: Etat
  criticite?: Criticite
  version_snmp?: VersionSNMP
  demande?: Demande
  serveurs?: Serveur[]
}

export interface TrapSnmpCreatePayload {
  ref: string
  etat_id: number
  refComposant: string
  signification: string
  versionSnmp_id: number
  oid: string
  specificTrap: string
  variableBinding: string
  criticite_id: number
  messageAlarme: string
  instructions: string
  acquittement: string
  mibAssocie: string
  objet: string
  compelementInformation: string
  demande_id: number
  serveurs_ids?: number
}