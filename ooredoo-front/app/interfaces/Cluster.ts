// interfaces/Cluster.ts
import type { Etat } from './Common'
import type { Demande } from './Demande'
import type { Serveur } from './Serveur'

export interface Cluster {
  id: number
  ref: string
  etat_id: number
  nomDuRessourceGroupPackageServiceGuard: string
  adresseIp: string
  listeDesServeursConcernes: string
  logicielCluster: string
  version: string
  mode: string
  serveurActif: string
  complementsInformations: string
  demande_id: number
  
  // Relations
  etat?: Etat
  demande?: Demande
  serveurs?: Serveur[]
}

export interface ClusterCreatePayload {
  ref: string
  etat_id: number
  nomDuRessourceGroupPackageServiceGuard: string
  adresseIp: string
  listeDesServeursConcernes: string
  logicielCluster: string
  version: string
  mode: string
  serveurActif: string
  complementsInformations: string
  demande_id: number
  serveurs_ids?: number[]  // Changed from number to number[]
}