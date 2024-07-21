/**
 * Монтирование корневого компонента приложения, с обёртками и провайдерами
*/

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '@/app/App';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { StoreProviderContext, StoreProvider } from '@/app/providers/StoreProvider';
import '@/app/styles/index.scss';


const container = document.getElementById('root');

if (!container) {
    throw new Error(
        'Контейнер root не найден. Не удалось вмонтировать react приложение',
    );
}

const root = createRoot(container);
root.render(
    <BrowserRouter>
        <StoreProviderContext.Provider value={new StoreProvider()}>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </StoreProviderContext.Provider>
    </BrowserRouter>,
);
