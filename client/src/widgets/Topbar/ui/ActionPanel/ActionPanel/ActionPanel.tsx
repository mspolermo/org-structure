import { memo, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { OpenPrintModal } from '@/features/openPrintModal';
import { OpenReportModal } from '@/features/openReportModal';
import { Help, Message, NutLock } from '@/shared/assets/svg-icons/action';
import { Printer2 } from '@/shared/assets/svg-icons/status';
import { getRouteAbout, getRouteSettings } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/ui/Stack';

import cls from './ActionPanel.module.scss';
import { modalActionType, modalType } from '../../../model/types/types';
import { ActionButton } from '../ActionButton/ActionButton';
import { ToMainPageButton } from '../ToMainPageButton/ToMainPageButton';
import { UserButton } from '../UserButton/UserButton';

interface ActionPanelProps {
	className?: string;
}

export const ActionPanel = memo(({ className }: ActionPanelProps) => {
    
    const [isPrintModal, setIsPrintModal] = useState(false);
    const [isReportModal, setIsReportModal] = useState(false);

    const navigate = useNavigate();

    const onModalAction = useCallback((type: modalType, action: modalActionType) => {
        const flag = action == 'open' ? true : false;

        switch (type) {
        case 'print':
            setIsPrintModal(flag);
            break
        case 'report':
            setIsReportModal(flag)
            break
        }

    }, []);

    const actionButtons = useMemo(() => [
        {
            tooltip: 'Настройки',
            action: () => navigate(getRouteSettings()),
            icon: NutLock
        },
        {
            tooltip: 'Печать',
            action: () => onModalAction('print', 'open'),
            icon: Printer2
        },
        {
            tooltip: 'Техподдержка',
            action: () => onModalAction('report', 'open'),
            icon: Message
        },
        {
            tooltip: 'Справка',
            action: () => navigate(getRouteAbout()),
            icon: Help
        }
    ], [navigate, onModalAction]);

    return (
        <HStack className={cls.ActionPanel}>

            <ToMainPageButton />

            <UserButton />

            <HStack className={classNames(cls.ActionBtns, {}, [className])} align='center'>
                {actionButtons.map(e =>
                    <ActionButton 
                        tooltipText={e.tooltip}
                        action={e.action}
                        Svg={e.icon}
                        key={e.tooltip}
                    />
                )}
            </HStack>

            <OpenPrintModal 
                isOpen={isPrintModal}
                onCloseModal={() => onModalAction('print', 'close')}
            />

            <OpenReportModal
                isOpen={isReportModal}
                onCloseModal={() => onModalAction('report', 'close')}
            />

        </HStack>

    );
});
