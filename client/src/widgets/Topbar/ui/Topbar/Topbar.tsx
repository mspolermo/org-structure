/**
 * Топбар приложения (располагается сверху) 
 * @param className - Проброс класса сверху
*/

import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { getHStack } from '@/shared/ui/Stack';

import cls from './Topbar.module.scss';
import { ActionPanel } from '../ActionPanel/ActionPanel';
import { SearchPanel } from '../SearchPanel/SearchPanel';

interface TopbarProps {
	className?: string;
}

export const Topbar = memo(({ className }: TopbarProps) => {
    return (
        <header
            className={classNames(
                cls.Topbar,
                {},
                [className, getHStack({justify: 'between', align:'center'})]
            )}
        >

            <SearchPanel />
            <ActionPanel />

        </header>
    );
});
