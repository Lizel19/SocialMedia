export interface singupModel{
    full_name: string,
    email: string,
    password: string,
    password_confirm: string
}

export interface AuthResData{
    user_id?: string,
    full_name?: string,
    email: string,
    token?: string
}

export interface loginModel{
    email: string,
    password: string
}

export class User{
    constructor(
        public id: string,
        public full_name: string,
        public email: string,
        public token: string
    ){}
    
}