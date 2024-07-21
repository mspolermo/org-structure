/**
 * Функция генератора цветов по id (возвращает цвет)
 */

const colors = [
    '#DD5143',
    '#C1433C',
    '#D93740',
    '#C92A39',
    '#AC2B37',
    '#DB3B50',
    '#C32E4C',
    '#9D2945',
    '#DB3E79',
    '#CF2366',
    '#AA2157',
    '#D73786',
    '#AE2359',
    '#9C2452',
    '#D70C7A',
    '#AF1C63',
    '#8F2054',
    '#C3167C',
    '#A41A67',
    '#AC2B81',
    '#B04590',
    '#AB3388',
    '#A12D86',
    '#9E3A8A',
    '#942D83',
    '#92579B',
    '#7A327E',
    '#6B2F6B',
    '#6A4593',
    '#61398B',
    '#59317C',
    '#2B74B7',
    '#24509A',
    '#1A4784',
    '#1B5196',
    '#1B4677',
    '#0076AE',
    '#006287',
    '#0084AC',
    '#006A85',
    '#00A1AA',
    '#009296',
    '#007A7B',
    '#00907D',
    '#007568',
    '#006A5F',
    '#167565'
]
  
export function convertId(id:string) {
    return id
        .replace(/-/g, '')
        .toLowerCase()
        .split('')
        .sort(function() {return Math.random() - 0.5})
        .sort(function() {return Math.random() - 0.2})
        .sort(function() {return Math.random() - 0.5})
        .reduce((prev, cur) => prev + cur.charCodeAt(0), 0)
}
  
export function getColor(id:string) {
    return colors[convertId(id) % colors.length]
}
  