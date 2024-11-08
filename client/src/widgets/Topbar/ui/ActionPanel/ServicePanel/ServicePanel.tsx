import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import { Help, Message, NutLock } from '@/shared/assets/svg-icons/action';
import { Printer2 } from '@/shared/assets/svg-icons/status';
import { getRouteAbout, getRouteSettings } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/ui/Stack';
import { modalActionType, modalType } from '@/widgets/Topbar/model/types/types';

import { ActionButton } from './ActionButton/ActionButton';
import cls from './ServicePanel.module.scss'

interface Props {
	className?: string;
    onModalAction: (type: modalType, action: modalActionType) => void
}

export const ServicePanel = observer((props: Props) => {
    const { className, onModalAction } = props

    const navigate = useNavigate();
    const { rootStore } = useStoreProvider();

    const actionButtons = useMemo(() => [
        {
            tooltip: 'Настройки',
            action: () => navigate(getRouteSettings()),
            icon: NutLock,
            authOnly: true
        },
        {
            tooltip: 'Печать',
            action: () => onModalAction('print', 'open'),
            icon: Printer2,
            authOnly: true
        },
        {
            tooltip: 'Техподдержка',
            action: () => onModalAction('report', 'open'),
            icon: Message,
            authOnly: false
        },
        {
            tooltip: 'Справка',
            action: () => navigate(getRouteAbout()),
            icon: Help,
            authOnly: false
        }
    ], [navigate, onModalAction]);

    return (
        <HStack className={classNames(cls.ServicePanel, {}, [className])} align='center'>
            {actionButtons
                .filter(button => !button.authOnly || rootStore.auth) // Проверка авторизации для кнопок
                .map(button => (
                    <ActionButton 
                        tooltipText={button.tooltip}
                        action={button.action}
                        Svg={button.icon}
                        key={button.tooltip}
                    />
                ))
            }
        </HStack>
    );
});
