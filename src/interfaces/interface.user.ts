export const userByDefault  = {
 id:0,
 email: "admin@yopmail.com",
 userName: 'admin',
 firstConnect: false,
 isAdmin: true,
 userActive: true,
}

export interface InterfaceUserConnection {
    email: string,
    password: string,
    rememberMe: boolean,
}

export interface User {
    id: number,
    email: string,
    userName: string,
    firstConnect: boolean,
    isAdmin: boolean,
    userActive: boolean,
}
