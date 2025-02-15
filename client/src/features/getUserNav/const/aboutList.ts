import { aboutItem } from "@/entities/Navigation";

export const aboutList: aboutItem [] = [
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
        title: 'Поиск',
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
        title: 'Редактирование данных',
        anchor: '#edit',
        child: [
            {
                title: 'Редактирование сотрудника',
                anchor: '#employee-edit'
            },
            {
                title: 'Редактирование контакта',
                anchor: '#contact-edit'
            },
            {
                title: 'Редактирование отдела',
                anchor: '#department-edit'
            },
        ]
    },
    {
        title: 'Бумажная версия',
        anchor: '#Report'
    },
    {
        title: 'Версия для сторонних организаций',
        anchor: '#ExternalReport'
    },
    {
        title: 'Сообщение разработчикам',
        anchor: '#Feedback'
    }
];
