import { useStoreStructure } from './structure.store';
import { userByDefault, type InterfaceUserConnection, type User } from '@/interfaces/interface.user';
import { deleteStructureOrPartnerService, loginUserService, updateUserService } from '@/services/service.user';
import { defineStore } from 'pinia';
import { useStorePartner } from './partner.store';

interface InterfaceStoreUser {
    user: User,
    isConnected: boolean,
    error: any,
    style: Style,
    listModale: InterfaceModale []
    
}

export type Style = "warning" | "success" | "danger"

interface InterfaceModale {
    content: string,
    style: Style,
}

export const useStoreUser = defineStore("storeUser", {
state: (): InterfaceStoreUser => ({
    user: userByDefault,
    isConnected: false,
    error: null,
    style: "danger",
    listModale: []
}),
getters: {

}, actions: {
    sendModale(content: string, style: Style){
        const modale: InterfaceModale = {content: content, style: style}
        this.listModale.push(modale)
        setTimeout(()=>{
            this.listModale.splice(0,1);
        },5000)
    },
    Connection: async function (connectionForm: InterfaceUserConnection) {
        try {
            if(this.error != null) {
                this.error = null
            }
            const user = await loginUserService(connectionForm)
            this.user = user
            this.isConnected = true
            if(user.firstConnect) {
                this.sendModale("Pour votre sécurité, veuillez changer de mot de passe", "danger")
            }
            if(connectionForm.rememberMe) {
                localStorage.setItem("userInformation", JSON.stringify(user))
            }
            this.sendModale("Vous êtes connectés", "success")
        } catch (e) {
            this.isConnected = false
            // @ts-ignore
            this.sendModale(e.error, "danger")
        }
    }, async updateUserName(email: string, name: string) {
        return await updateUserService(email, name)
    }, async updateUserPassword (password: string) {
        return await updateUserService(this.user.email,password)
    }, async updateUserActive(email: string, active:boolean) {
        return await updateUserService(email, active)
    }, async deletePartnerOrStructure(id: number, type: string) {
        const response = deleteStructureOrPartnerService(id, type)
        if(type == "partner") {
            const storePartner = useStorePartner()
            const indexPartner = storePartner.partner.findIndex(partner => partner.id === id)
            if(indexPartner !== -1) 
            storePartner.partner.splice(indexPartner, 1)
            storePartner.needRefresh= true
        }
        else {
            const storeStructure = useStoreStructure()
            const indexStructure = storeStructure.structure.findIndex(structure => structure.id === id)
            if(indexStructure !== 1) {
                storeStructure.structure.splice(indexStructure, 1)
                storeStructure.isRefreshNeeded = true
            }
        }
    } 
}
})