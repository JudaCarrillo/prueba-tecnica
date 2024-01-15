export interface Client {
    email: string,
    password: string,
}

export interface GlobalParameter extends Client {
    send_email: boolean
}

export interface ClientAndToken extends GlobalParameter {
    id_token: string
}