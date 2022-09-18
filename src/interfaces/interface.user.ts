export const userByDefault  = {
 id:0,
 email: "admin@yopmail.com",
 userName: 'admin',
 firstConnect: false,
 isAdmin: true,
 userActive: true,
}

export interface InterfaceUserConnection {
    email: String,
    password: String,
    rememberMe: boolean,
}

export interface User {
    id: number,
    email: String,
    userName: String,
    firstConnect: boolean,
    isAdmin: boolean,
    userActive: boolean,
}
