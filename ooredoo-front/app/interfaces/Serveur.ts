// interfaces/Serveur.ts
import type { Etat , Platforme , TypeServeur ,OS , SocleStandardOMU , VersionTechFirmware} from './Common'
import type { Demande } from './Demande'
import type { ServicePlatform } from './ServicePlatform'

export interface Serveur {
  id: number
  ref: string
  etat_id: number
  platforme_id: number
  hostname: string
  fqdn: string
  type_id: number
  serviceplatfom_id: number
  modele: string
  os_id: number
  verTechFirmware_id: number | null
  cluster: string
  ipSource: string
  description: string
  socleStandardOmu_id: number
  complementsInformations: string
  demande_id: number
  
  // Relations
  etat?: Etat
  platforme?: Platforme
  typeserveur?: TypeServeur
  os?: OS
  soclestandardomu?: SocleStandardOMU
  ver_tech_firmware?: VersionTechFirmware
  demande?: Demande
  serviceplatfom?:ServicePlatform 
}

export interface ServeurCreatePayload {
  ref: string
  etat_id: number
  platforme_id: number | null
  hostname: string
  fqdn: string
  type_id: number | null
  modele: string
  os_id: number | null
  verTechFirmware_id?: number | null
  cluster: string
  ipSource: string
  description: string
  socleStandardOmu_id: number | null
  complementsInformations: string
  demande_id: number | null
}