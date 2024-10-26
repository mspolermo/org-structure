/**
 * Функция преобразования данных даты (из ISO в человеческий вид)
 * @param dateString - строка с датой в формате ISO
 * @returns строка с датой в формате "день/месяц/год"
 */
export function formatDate(dateString: string): string {
    // Преобразуем строку в объект Date
    const date = new Date(dateString);

    // Проверяем, является ли дата валидной
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date format');
    }

    // Форматируем дату в строку "день/месяц/год"
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return formattedDate;
}

/**
 * Функция преобразования даты из формата "день/месяц/год" в ISO
 * @param dateString - строка с датой в формате "день/месяц/год"
 * @returns строка с датой в формате ISO
 */
export function formatDateToISO(dateString: string): string {
    const [day, month, year] = dateString.split('/').map(Number); // Разделяем строку и преобразуем в числа

    // Создаем объект Date, указывая месяц (месяцы начинаются с 0)
    const date = new Date(Date.UTC(year, month - 1, day)); 

    // Форматируем дату в строку ISO
    return date.toISOString(); // Возвращаем в формате ISO
}
