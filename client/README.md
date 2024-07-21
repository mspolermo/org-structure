# Сборка клиента

## Скрипты
- `yarn run dev` - Запуск проекта в режиме разработки
- `yarn run build` - Сборка проекта
- `yarn run preview` - Запуск проекта в режиме разработки со сборкой проекта
- `yarn run lint` - Проверка .ts, .tsx файлов линтером
- `yarn run lint:fix` - Исправление .ts, .tsx файлов линтером в авто-режиме

----

## Архитектура проекта

Проект написан в соответствии с методологией Feature Sliced Design

Документация по архитектуре - [FSD](https://feature-sliced.design/docs/get-started/tutorial)

### App

Верхний уровень приложения. Описание функционала находится в начале каждого файла-компонента.

  /lib - вспомогательные функции верхнего уровня (могут использовать все низлежащие слои)

  /providers - главные обертки и конфиги
    - ErrorBoundary - правильное отображение ошибок краха приложения
    - router - роутинг приложения
    - StoreProvider - провайдер объеденяющий mobX-сторы приложения (rootStore), главный mobX-стор, хук для вызова подключенных сторов
    - ThemeProvider - провайдер с логикой смены цветовых тстилей приложения

  /styles - корневые стили 
    /fonts - шрифты и их подключения
    /themes - CSS-переменные палитры цветовых тем 
    /variables - CSS-переменные (отступы, размеры, z-индексы, шрифты)
    index.scss - корневой файл стилей приложения
    reset.scss - обнуление всех стандартных стилей

  /types - декларации и объявление глобальных типов

App.tsx - корневой файл, над ним только root-обертки.

### Pages

- [AboutPage](/src/pages/AboutPage/README.md)

- [DepartmentPage](/src/pages/DepartmentPage/README.md)

- [EditPersonPage](/src/pages/EditPersonPage/README.md)

- [EditOrgUnitPage](/src/pages/EditOrgUnitPage/README.md)

- [FavoritesPage](/src/pages/FavoritesPage/README.md)

- [ForbiddenPage](/src/pages/ForbiddenPage/README.md)

- [MainPage](/src/pages/MainPage/README.md)

- [NotFoundPage](/src/pages/NotFoundPage/README.md)

- [SettingsPage](/src/pages/SettingsPage/README.md)

- [SearchPage](/src/pages/SearchPage/README.md)

### Widgets

- [DevPanel](/src/widgets/DevPanel/README.md)

- [ErrorPage](/src/widgets/ErrorPage/README.md)

- [Page](/src/widgets/Page/README.md)

- [PageLoader](/src/widgets/PageLoader/README.md)

- [Sidebar](/src/widgets/Sidebar/README.md)

- [Topbar](/src/widgets/Topbar/README.md)

### Features

- [collapseAllOrgUnitsBtn](/src/features/collapseAllOrgUnitsBtn/README.md)

- [getDepartment](/src/features/getDepartment/README.md)

- [getUserNav](/src/features/getUserNav/README.md)

- [openPrintModal](/src/features/openPrintModal/README.md)

- [openReportModal](/src/features/openReportModal/README.md)

- [scrollToTopButton](/src/features/scrollToTopButton/README.md)

- [ThemeSwitcher](/src/features/ThemeSwitcher/README.md)

### Entities

- [OrgUnitItem](/src/entities/OrgUnitItem/README.md)

- [Person](/src/entities/Person/README.md)

- [Navigation](/src/entities/Navigation/README.md)

- [User](/src/entities/User/README.md)

### Shared

Общие компоненты нижнего уровня, используемые по всему приложению. Описание функционала находится в начале каждого файла-компонента (name.ts\name.tsx).

  /assets - хранилище постоянных файлов (иконки, изображения и прочее)

  /const - общие константы, используемые по всему приложению (!! это не переменные окружения)

  /layouts - макеты верстки

  /lib - библиотеки\хуки\хелперы\вспомогательные функции

  /types - общие типы, используемые по всему приложению
  
  /ui - библиотека UI-компонентов

----


## Доп. информация

- Для того, чтобы работало автообновление во время разработки, надо включить функцию AutoSave в IDE
- Для того, чтобы работал ESLint в VSCode, необходимо установить плагин 'ESlint':
- Для того, чтобы работал ESLint в WebStorm:
  - Зайти в настройки IDE (Settings)
  - Найти "eslint"
  - Выбрать "Automatic ESLint configuration"
  - Заменить паттерн на "**/*.(js|ts|jsx|tsx|html|vue)"
