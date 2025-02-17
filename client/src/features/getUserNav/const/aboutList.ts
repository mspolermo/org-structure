import { aboutItem } from "@/entities/Navigation";

export const aboutList: aboutItem [] = [
    {
        title: 'Авторизация',
        anchor: '#auth-page',
    },
    {
        title: 'Главная страница',
        anchor: '#main-page',
        child: [
            {
                title: 'Создание объявлений',
                anchor: '#create-notification'
            },
        ]
    },
    {
        title: 'Просмотр отделов',
        anchor: '#view-department'
    },
    {
        title: 'Просмотр дополнительной информации',
        anchor: '#additional-info',
    },
    {
        title: 'Работа с избранным',
        anchor: '#favorites'
    },
    {
        title: 'Поиск и страница поиска',
        anchor: '#search',
        child: [
            {
                title: 'Автоподстановка фамилии',
                anchor: '#auto-last-name'
            },
            {
                title: 'Служебные слова',
                anchor: '#work-words'
            }
        ]
    },
    {
        title: 'Настройки системы',
        anchor: '#settigns-page',
    },
    {
        title: 'Редактирование данных',
        anchor: '#edit',
        child: [
            {
                title: 'Редактирование сотрудника',
                anchor: '#person-edit'
            },
            {
                title: 'Редактирование отдела',
                anchor: '#department-edit'
            },
        ]
    },
    {
        title: 'Администрирование',
        anchor: '#admin',
        child: [
            {
                title: 'Создание отдела',
                anchor: '#create-department'
            },
            {
                title: 'Добавление сотрудника',
                anchor: '#create-person'
            },
            {
                title: 'Создание пользователя',
                anchor: '#create-user'
            },
            {
                title: 'Изменение роли пользователя',
                anchor: '#role-edit'
            },
        ]
    }
];
