export interface User {
    id: string;
    email: string;
    name: string;
    allowDeveloperTools: boolean;
}

export interface UserAuthData {
    email: string;
    password: string;
}
