## Сущность Навигации

### Описание:

Навигация, используемая в левом сайдбаре (может быть по отделам, может быть по странице справки)

### Components:

- `NavPanel` - Корневой компонент для отображении навигации. В зависимости передано ли localdata отрисовывает или якорную навигацию для страницы "Справка" (если передано) или навигацию по отделам (из загружаемых в MobX стор данных с сервера)
    Принимает сверху:
        - 'className' - проброс класса сверху
        - 'localdata' - данные для отрисовки навигации на странице "Справка"

- `NavItem` - Компонент для отрисовки группы с отделами 
    Принимает сверху:
        - 'className' - проброс класса сверху
        - 'data' - данные для отрисовки

- `FixedBtn` - Компонент для отрисовки фиксированной кнопки снизу навигационной панели (например "Избранное" или "На главную"), являющейся ссылкой на страницу
    Принимает сверху:
        - 'className' - проброс класса сверху
        - 'type' - вариант кнопки (влияет на визуал и логику действия)

- `AnchorItem` - Компонент для отрисовки якорной навигации (по id), для страницы "Справка"
    Принимает сверху:
        - 'className' - проброс класса сверху
        - 'data' - данные для отрисовки

### Types:
- `NavItemType` - тип айтема (конкретного отдела\цеха и пр)
- `NavGroupType` - тип группы айтемов
- `aboutItem` - тип для навигации в странице "Справка"("About")