import { URL_SCHEME } from './service.index';
import type { InterfaceAddPartner, InterfacePartner, InterfacePartnerInformations } from "@/interfaces/interface.partner";


export async function retrieveAllPartner(): Promise<InterfacePartner[]> {
    const response = await (await fetch(`${URL_SCHEME}/partner`)).json();
    if(!response.error){
        return response;
    }else{
        throw response;
    }
}

export async function retrievePartnerById($partner_id : number) : Promise<InterfacePartnerInformations>{
    const response = await (await fetch(`${URL_SCHEME}/partner/${$partner_id}`)).json()
    if(!response.error){
        return response;
    }else{
        throw response;
    }
}

export async function addPartner(formInformations : InterfaceAddPartner){
    const response = await (await fetch(`${URL_SCHEME}/partner`, {
        method: "POST",
        body: JSON.stringify(formInformations),
        headers: {
            "Content-type": "application/json"
        }
    })).json()
    if(!response.error){
        return response;
    }else{
        throw response;
    }
}

export async function updatePartnerById(partnerId : number ,partnerName: string, logoUrl: string){
    const response = await (await fetch(`${URL_SCHEME}/partner`,{
        method: "PUT",
        body: JSON.stringify({
            partnerId : partnerId,
            partnerName: partnerName,
            logoUrl: logoUrl
        })
    })).json()
    if (!response.error){
        return response;
    }else{
        throw response;
    }
}

export async function updateActivePartner(partnerId : number, active: boolean){
    const response = await (await fetch(`${URL_SCHEME}/partner/active`,{
        method: "PUT",
        body :JSON.stringify({
            partnerId: partnerId,
            partnerActive: active
        })
    })).json()
    if (!response.error){
        return response;
    }else{
        throw  response;
    }
}

export async function updateActiveDroitPartner(partnerId:number, gestionName:string, gestionActive:boolean){
    const response = await (await fetch(`${URL_SCHEME}/partner/droit`,{
        method: "PUT",
        body :JSON.stringify({
            partnerId: partnerId,
            gestionName: gestionName,
            gestionActive:gestionActive
        })
    })).json()
    if (!response.error){
        return response;
    }else{
        throw  response;
    }
}