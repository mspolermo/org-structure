export interface Person {
    name: string,
    isChief: boolean,
    isManager: boolean,
    post: string,
    id: string,
    children: Person[],
    canEdit: boolean, // TODO этот флаг нужен для отображения кнопки редактировать
    nestingLevel: number,
    mainContact: {
        phone: {
            type: any, // какие типы кроме null?
            number: string,
            description: any, // какие типы кроме null?
        },
        location: string
    }
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