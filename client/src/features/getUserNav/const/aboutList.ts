import { aboutItem } from "../../../entities/Navigation/model/types/navigation";

export const aboutList: aboutItem [] = [
    {
        title: 'Просмотр отделов',
        anchor: '#view-department'
    },
    {
        title: 'Просмотр дополнительной информации',
        anchor: '#additional-info',
        child: [
            {
                title: 'Сервис просмотра фотографии',
                anchor: '#service-view-photo'
            },
            {
                title: 'Сервис просмотра дней рождений',
                anchor: '#service-view-birthday'
            },
        ]
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
                title: 'Уточняющий поиск',
                anchor: '#specifying-search'
            },
            {
                title: 'Поиск отдела и группы',
                anchor: '#search-by-group'
            },
            {
                title: 'Служебные слова',
                anchor: '#work-words'
            },
            {
                title: 'Поиск с пробелом',
                anchor: '#search-with-space'
            },
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
                title: 'Редактирование информации об отсутсвии сотрудника',
                anchor: '#employee-edit-leave'
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
