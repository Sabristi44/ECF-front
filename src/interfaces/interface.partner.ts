import type { InterfaceGestion } from './interface.gestion';
import type { interfaceStructureInformations } from './interface.structure';

export  interface InterfacePartner {
    id: number,
    userId: number,
    userName: string,
    email: string,
    partnerName: string,
    partnerActive: boolean,
    logoUrl: string
}

export interface InterfaceAddPartner {
    partnerName: string,
    partnerActive: string,
    userEmail: string,
    userName: string
}

export interface InterfacePartnerInformations {
    userId : number,
    partnerId: number,
    userName : string,
    userEmail: string,
    userActive: boolean,
    partnerName: string,
    partnerActive: boolean,
    logoUrl: string,
    gestion: InterfaceGestion,
    struct : interfaceStructureInformations[] | any
}