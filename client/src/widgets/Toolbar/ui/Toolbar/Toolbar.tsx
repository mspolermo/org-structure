/**
 * Панель панели инструментов (располагается сбоку на странице DepartmentPage) 
 * @param className - Проброс класса сверху
 * @param collapseAllOrgUnitsBtn - С кнопкой "Свернуть все отделы" (для страницы отделов)
 * @param toPreviousPageBtn - С кнопкой "Вернуться к предыдущей странице"
*/

import { memo } from 'react';

import { CollapseAllOrgUnitsBtn } from '@/features/collapseAllOrgUnitsBtn';
import { ReturnToPreviousPageBtn } from '@/features/returnToPreviousPageBtn';
import { ScrollToTopButton } from '@/features/scrollToTopButton';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';

import cls from './Toolbar.module.scss';

interface DepartmentToolbarProps {
    scrollToTopBtn?: boolean;
	className?: string;
    collapseAllOrgUnitsBtn?: boolean;
    toPreviousPageBtn?: boolean;
}

export const Toolbar = memo((props: DepartmentToolbarProps) => {
    const {
        className,
        scrollToTopBtn = true,
        collapseAllOrgUnitsBtn,
        toPreviousPageBtn
    } = props;
    return (
        <VStack
            justify='between'
            align='center'
            className={classNames(
                cls.Toolbar,
                {},
                [className]
            )}
        >
            <VStack className={cls.Top} gap='16'>
                {collapseAllOrgUnitsBtn && <CollapseAllOrgUnitsBtn />}
                {toPreviousPageBtn && <ReturnToPreviousPageBtn />}
            </VStack>

            <VStack className={cls.Buttom} gap='16'>
                {scrollToTopBtn && <ScrollToTopButton   />}
            </VStack>

        </VStack>
    );
});
