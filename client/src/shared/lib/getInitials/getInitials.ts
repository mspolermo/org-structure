/**
 * Функция Получения инициалов из полного имени ('Иванов Андрей Петрович' -> 'АП' )
 */

export function getInitials(fullName: string) {
    const array = fullName.split(' ');
    return ( array[1][0] + array[2][0] );
}
