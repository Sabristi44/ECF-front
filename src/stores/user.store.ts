import { userByDefault, type InterfaceUserConnection, type User } from '@/interfaces/interface.user';
import { defineStore } from 'pinia';

interface InterfaceStoreUser {
    user: User,
    isConnected: boolean,
    error: any,
    style: Style,
    listModale: InterfaceModale []
    
}

export type Style = "warning" | "success" | "danger"

interface InterfaceModale {
    content: String,
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
    sendModale(content: String, style: Style){
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
            const user = await userConnection(connectionForm)
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
            this.sendModale(e.error.toString, "danger")
        }
    }, async updateUserName(email: String, name: String) {
        return await updateUser(email, name)
    }, async updateUserPassword (password: String) {
        return await updateUser(this.user.email,password)
    }, async updateUserActive(email: String, active:boolean) {
        return await updateUser(email, active)
    }, async deletePartnerOrStructure(id: number, type: String) {
        const response = ServiceDeletePartnerOrStructureService(id, type)
        if(type == "partner") {
            const storePartner = useStorePartner()
            const indexPartner = storePartner.partner.findIndex(partner => partner.id === id)
            if(indexPartner !== -1) 
            storePartner.partner.splice(indexPartner, 1)
            storePartner.isRefreshNeeded = true
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