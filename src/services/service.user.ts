import type { InterfaceUserConnection, User} from './../interfaces/interface.user';
import { URL_SCHEME } from './service.index';


export async function loginUserService(User : InterfaceUserConnection): Promise<User> {
    const response = await (await fetch(`${URL_SCHEME}/login`,
        {
            method: "POST",
            body: JSON.stringify({
                user_email: User.email,
                user_password: User.password,
            }),
            headers: {
                "Content-type": "application/json"
            }
        })).json();
    if(!response.error){
        return response;
    }else{
        throw response;
    }
}

export async function updateUserService(email : string ,value: string|boolean){
    const response = await (await fetch(`${URL_SCHEME}/user/`,{
        method: "PUT",
        body: JSON.stringify({
            userEmail : email,
            value: value
        })
    })).json()
    if (!response.error){
        return response;
    }else{
        throw response;
    }
}

export async function deleteStructureOrPartnerService (id:number, type:string){
    const response = await (await fetch(`${URL_SCHEME}/${type}/${id}`,{
        method: "DELETE"
    })).json()
    if (!response.error){
        return response;
    }else{
        throw response;
    }
}