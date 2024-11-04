import { OrgUnitItem } from "@/entities/OrgUnitItem";

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

export interface PersonUpdateData extends Pick<
    Person,
    'name' |
    'post' |
    'email' |
    'phone' |
    'location' | 
    'isChef' | 
    'isManager' |
    'birthday'
> {}

export interface PersonDetalesUpdateData extends Pick<
    PersonDetales,
    'items'|
    'hardware'
    | 'software'
    | 'exams'
> {}

export interface PersonFullUpdateData {
    person: PersonUpdateData;
    personDetales: PersonDetalesUpdateData;
}

export interface PersonSearched extends Person {
    orgUnit: OrgUnitItem
}

export interface PersonSearhRequest {
    name?: string,
    phone?: string,
    location?: string
}
