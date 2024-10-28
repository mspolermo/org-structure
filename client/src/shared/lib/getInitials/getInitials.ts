/**
 * Функция Получения инициалов из полного имени ('Иванов Андрей Петрович' -> 'АП' )
 */

export function getInitials(fullName: string) {
    const array = fullName.split(' ');

    if(array.length !== 3) return '--'
    return ( array[1][0] + array[2][0] );
}
