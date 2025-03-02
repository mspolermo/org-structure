/**
 * Компонент-обертка для страницы 
 * @param className - проброс класса сверху
 * @param children - содержимое
 * @param header? - Заголовок страницы
 * @param description? - Описание страницы
*/

import { observer } from 'mobx-react';
import { ReactNode } from 'react';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getVStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './Page.module.scss';

interface PageProps {
    className?: string;
    children: ReactNode;
    header?: string;
    description?: string;
}

export const Page = observer((props: PageProps) => {
    const { className, children, header, description } = props;

    const { rootStore } = useStoreProvider();
    const isDevPanelOpen = rootStore.devMode;

    const currentYear = new Date().getFullYear(); 
    
    return (
        <main
            className={classNames(
                cls.Page,
                {[cls.withDevpanel]: isDevPanelOpen},
                [className, getVStack({})])}
        >

            <div
                className={classNames(
                    cls.header,
                    {[cls.withoutHeader]: !(Boolean(header) || Boolean(description) )},
                    [className])}
            >
                <div id='topBorder' className={cls.topBorder}/>
                <Text title={header} text={description}/> 
            </div>

            <div className={cls.content}>
                {children}
            </div>
            
            <div className={cls.footer}>
                <Text text={`© ${currentYear}, "Оргструктура"`} size='xs' />
            </div>
            
        </main>
    );
});
