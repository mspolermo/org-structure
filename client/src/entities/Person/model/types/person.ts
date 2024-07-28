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

// Новый эндпойнт
export interface personDetails {
    id: string,
    name: string,
    canEdit: boolean,
    contacts: {
        phone: {
            type: null, // или что?
            number: string,
            description: null // или что?
        },
        location: string
    }[],
    appointments: {
        id: string,
        orgUnitName: string,
        post: string
    } []
}