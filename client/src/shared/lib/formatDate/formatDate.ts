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