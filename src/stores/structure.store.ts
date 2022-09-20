import { useStoreUser } from '@/stores/user.store';
import { addStructure, retrieveAllStructure, updateActiveDroitStructure, updateActiveStructure, updateStructure } from '@/services/service.structure';
import { defineStore } from 'pinia';
import { DEFAULT_SEARCH, type InterfaceSearch, type SearchUpdate } from './../interfaces/interface.search';
import type { interfaceAddStructure, StructureInterface } from './../interfaces/interface.structure';
interface InterfaceStoreStructure{
    structure : StructureInterface[],
    search: InterfaceSearch,
    isRefreshNeeded: boolean
}

export const useStoreStructure = defineStore("storeStructure",{
    state: (): InterfaceStoreStructure =>({
        structure : [],
        search: {... DEFAULT_SEARCH},
        isRefreshNeeded : false,
    }),
    getters: {
        filteredStruct(state){
            return state.structure.filter(structure => {
                const statePartner = structure.structureActive === true ? "enable" : "disable";
                return structure.structureName.toLocaleLowerCase().startsWith(state.search.keyword.toLocaleLowerCase()) &&
                    (state.search.state === "all" || state.search.state === statePartner)
            })
        }
    },
    actions: {
        async retrieveStructure(){
            this.structure = await retrieveAllStructure();
        },
        async updateActive(structureId : number, active:boolean){
            const updateStructure = await updateActiveStructure(structureId, active)
            if(updateStructure){
                this.isRefreshNeeded = true
                const indexStructure = this.structure.findIndex(partner => partner.id === structureId)
                this.structure[indexStructure].structureActive = active
            }
        },
        async addStructure(formInformations : interfaceAddStructure){
            const response = await addStructure(formInformations);
            if (response){
                this.structure.push(response)
                this.isRefreshNeeded = true
            }
        },
        updateSearch(updateSearch: SearchUpdate){
            if (updateSearch.keyword !== undefined){
                this.search.keyword = updateSearch.keyword
            }else if(updateSearch.state){
                this.search.state = updateSearch.state
            }else{
                this.search = {... DEFAULT_SEARCH}
            }
        },
        async updateDroitActive(structureId:number, gestionName:string,gestionActive:boolean){
            const updateStructureDroits = await updateActiveDroitStructure(structureId, gestionName, gestionActive)
            if (updateStructureDroits){
                this.isRefreshNeeded = true
            }
        },
        async updateStructure(structureId: number, structureName: string, userEmail:string, userName:string){
            const userStore = useStoreUser()
            const response = await updateStructure(structureId, structureName)
            const response2 = await userStore.updateUserName(userEmail, userName)
            if (response && response2){
                this.isRefreshNeeded =true
                const indexStructure = this.structure.findIndex(element => element.id === structureId)
                this.structure[indexStructure].structureName = structureName
                this.structure[indexStructure].userName = userName
            }
        }
    }
})

export function initFetchStructureInfos(){
    const storeStructure = useStoreStructure()
    if (storeStructure.isRefreshNeeded){
        storeStructure.structure = []
        storeStructure.isRefreshNeeded = false
    }
    storeStructure.retrieveStructure
}