import type { interfaceAddStructure,StructureInterface } from './../interfaces/interface.structure';
import { URL_SCHEME } from './service.index';


export async function retrieveAllStructure(): Promise<StructureInterface[]>{
    const response = await (await fetch(`${URL_SCHEME}/structure`)).json()
    if(!response.error){
        return response;
    }else{
        throw response;
    }
}

export async function retrieveStructureById(structureId : number){
    const response = await (await fetch(`${URL_SCHEME}/structuree/${structureId}`)).json()
    if(!response.error){
        return response;
    }else{
        throw response;
    }
}

export async function addStructure(formInformations : interfaceAddStructure){
    const response = await (await fetch(`${URL_SCHEME}/structure`, {
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

export async function updateStructure(structureId : number , structureName: string){
    const response = await (await fetch(`${URL_SCHEME}/structure`,{
        method: "PUT",
        body: JSON.stringify({
            structureId : structureId,
            structureName: structureName
        })
    })).json()
    if (!response.error){
        return response;
    }else{
        throw response;
    }
}

export async function updateActiveStructure (structureId : number, active: boolean){
    const response = await (await fetch(`${URL_SCHEME}/structure/active`,{
        method: "PUT",
        body: JSON.stringify({
            structureId: structureId,
            structureActive: active
        })
    })).json()
    if (!response.error){
        return response;
    }else{
        throw response;
    }
}

export async function updateActiveDroitStructure(structureId:number, gestionName:string, gestionActive:boolean){
    const response = await (await fetch(`${URL_SCHEME}/structure/droit`,{
        method: "PUT",
        body :JSON.stringify({
            structureId: structureId,
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