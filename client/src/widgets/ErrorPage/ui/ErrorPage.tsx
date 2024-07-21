import { memo, useCallback } from "react";

import { Button } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './ErrorPage.module.scss';

export const ErrorPage = memo(() => {

    const reloadPage = useCallback(() => {
        location.reload();
    }, []);

    return (
        <section className={cls.ErrorPage}>
            <VStack gap='8' align='center'>
                <Text
                    title='Произошла ошибка' 
                    text='Информация направлена разработчикам'
                    align='center'
                    size='m'
                />
                <Button onClick={reloadPage} variant='outline'>Обновить страницу</Button>
            </VStack>
        </section>
    );
});
