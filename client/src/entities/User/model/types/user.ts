export type UserRole = {
    value: string
    description: string
}

export interface User {
    id: string;
    email: string;
    name: string;
    allowDeveloperTools: boolean;
    roles: UserRole[]
}

export interface UserAuthData {
    email: string;
    password: string;
}
