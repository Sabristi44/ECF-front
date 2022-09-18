import {useStoreUser} from "@/stores/user.store";

export function isAdmin() {
    const storeUser = useStoreUser()
    if(storeUser.user.isAdmin != true) {
        return "/secure"
    }
}

export function isLoginOrActivateAccount() {
    const storeUser = useStoreUser()
    if(storeUser.user.userActive != true || storeUser.user.userActive != true) {
        return "/"
    }
}

export function isNotLogin() {
    const storeUser = useStoreUser()
    if(localStorage.user){
        storeUser.isConnected = true
        storeUser.user = JSON.parse(localStorage.user)
    }
    if(storeUser.isConnected) {
        return "/secure"
    }
}

