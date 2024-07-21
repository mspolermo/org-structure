import { lazy } from 'react';

// TODO - убрать эмуляцию задержки ответа с сервера

export const SettingsPageAsync  = lazy(() => {
    return new Promise(resolve => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setTimeout(() => resolve(import("./SettingsPage")), 1200);
    });
});