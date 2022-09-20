import { useStoreUser } from './user.store';
import { type InterfaceSearch, DEFAULT_SEARCH, type SearchUpdate } from './../interfaces/interface.search';
import type { InterfaceAddPartner, InterfacePartner } from "@/interfaces/interface.partner";
import { defineStore } from 'pinia';
import { addPartner, retrieveAllPartner, updateActiveDroitPartner, updateActivePartner, updatePartnerById } from '@/services/service.partner';

interface InterfaceStorePartner{
    partner: InterfacePartner[],
    search : InterfaceSearch,
    isLoading: boolean,
    loaded: boolean,
    needRefresh: boolean
}

export const useStorePartner = defineStore("partner", {
    state: (): InterfaceStorePartner => ({
        partner : [],
        search : {...DEFAULT_SEARCH},
        isLoading: false,
        loaded : false,
        needRefresh : false
    }),
    getters: {
        searchPartner(state){
            return state.partner.filter(partner => {
                const statePartner = partner.partnerActive === true ? "enable" : "disable";
                return partner.partnerName.toLocaleLowerCase().startsWith(state.search.keyword.toLocaleLowerCase()) &&
                    (state.search.state === "all" || state.search.state === statePartner)
            })
        }
    },
    actions: {
        async fetchPartner(){
            this.isLoading = true
            this.partner = await retrieveAllPartner();
            this.isLoading = false
        },
        async addPartner(formInformations: InterfaceAddPartner){
            this.isLoading = true
            const response = await addPartner(formInformations)
            if (response){
                this.needRefresh = true;
                this.partner.push(response)
            }
            this.isLoading = false
        },
        async updateActive(partnerId : number, active: boolean){
            const editPartner = await updateActivePartner(partnerId, active)
            if(editPartner){
                this.needRefresh = true
                const indexPartner = this.partner.findIndex(p => p.id === partnerId)
                this.partner[indexPartner].partnerActive = active
            }
        },
        async updateActiveDroit(partnerId :number, gestionName:string, gestionActive:boolean){
            const editDroitPartner = await updateActiveDroitPartner(partnerId, gestionName, gestionActive);
            if (editDroitPartner){
                this.needRefresh = true
            }
        },
        updateSearch(searchUpdate : SearchUpdate){
            if (searchUpdate.keyword !== undefined){
                this.search.keyword = searchUpdate.keyword
            }else if(searchUpdate.state){
                this.search.state = searchUpdate.state
            }else{
                this.search = {... DEFAULT_SEARCH}
            }
        },
        async updatePartner(partnerId: number, partnerName: string, logoUrl: string, userEmail: string, userName: string){
            const storeUser = useStoreUser()
            const response = await updatePartnerById(partnerId, partnerName, logoUrl)
            const resp = await storeUser.updateUserName(userEmail, userName)
            if (response && resp){
                this.needRefresh = true
                const indexPartner = this.partner.findIndex(element => element.id === partnerId)
                this.partner[indexPartner].logoUrl = logoUrl
                this.partner[indexPartner].partnerName = partnerName
                this.partner[indexPartner].userName = userName
            }
        }
    }
})


export function initFetchPartnerInfos(){
    const storePartner = useStorePartner()
    if (!storePartner.loaded || storePartner.needRefresh){
        if(storePartner.needRefresh){
            storePartner.partner = []
            storePartner. needRefresh = false
        }
    }
    storePartner.fetchPartner()
    storePartner.loaded = true
}