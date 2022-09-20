import type { InterfaceGestion } from "./interface.gestion";

export interface interfaceDetailsStructure{
    structureId : number,
    structureName: string,
    structureActive: boolean,
    partnerId: number,
    partnerUserId: number,
    partnerName: string,
    partnerActive: boolean,
    userId: number,
    userName: string,
    userEmail: string,
    userActive: boolean,
    gestion: InterfaceGestion,
}

export interface interfaceStructureInformations {
    id: number,
    structureName : string,
    structureActive : boolean,
    gestion : InterfaceGestion,
}

export interface interfaceAddStructure {
    userEmail: string,
    structureName: string,
    structureActive: string,
    partnerId: number,
}

export interface StructureInterface{
    id: number,
    structureName: string,
    structureActive: boolean,
    PartnerId: number,
    partnerName: string,
    PartneruserId: number,
    logoUrl: string,
    userId: number,
    email: string,
    userName: string,
    userActive: boolean,
}