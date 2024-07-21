/**
 * Компонент-кнопка, для тестирования ErrorBoundary (пробос ошибки в приложение)
*/

import { useEffect, useState } from 'react';

import { Button } from '@/shared/ui/Button';

export const BugButton = () => {
    const [error, setError] = useState(false);

    const onThrow = () => {
        setError(true);
    };

    useEffect(() => {
        if (error) {
            throw new Error();
        }
    }, [error]);

    return <Button onClick={onThrow} size='s'>Проброс ошибки</Button>;
};
