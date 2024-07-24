# Фича получения навигации по отделам и пользовательских данных

## Описание:

Фича загружает данные о пользователе и навигации. Навигация отрисовывается в зависимости от роута ( для страницы "Справка" -статическая якорная, для других страниц - загруженная с сервера (с информацией об отделах))

### Const

`aboutList` - Якорная навигация для страницы "Справка"

### Lib:

`useAppNavpanel` - Хук, позволяющий отрисовывать разное навигационное меню для различных роутов

### Services

`fetchUserNav` - Загрузка данных о навигации по отделам и пользовательских данных с сервера. Происходит при отрисовке приложения 

### Types

`UserNavType` - Типизация загружаемых данных