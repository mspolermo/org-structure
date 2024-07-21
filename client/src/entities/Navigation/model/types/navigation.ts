// получаемые с сервера данные

export interface NavGroupType {
    name: NavItemType,
    items: NavItemType[]
}

export interface NavItemType {
    id: string,
    name: string,
    isLink: boolean
}

// для навигации в странице "Справка"("About")
export interface aboutItem {
    title: string,
    anchor: string
    child?: aboutItem []
}
