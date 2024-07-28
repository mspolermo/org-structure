export interface Person {
    id: string,
    name: string,
    post: string,
    email: string,
    phone: string
    location: string,
    isChef: boolean,
    isManager: boolean,
    birthday: Date,
    employmentDate: Date,
    table: string
}

export interface PersonDetales {
    id: string,
    items: string,
    hardware: string,
    software: string,
    exams: string
}