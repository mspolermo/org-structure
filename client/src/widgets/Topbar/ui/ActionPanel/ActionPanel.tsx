import { memo, useCallback, useState } from 'react';

import { OpenPrintModal } from '@/features/openPrintModal';
import { OpenReportModal } from '@/features/openReportModal';
import { HStack } from '@/shared/ui/Stack';

import { ServicePanel } from './ServicePanel/ServicePanel';
import { ToAdminPageButton } from './ToAdminPageButton/ToAdminPageButton';
import { ToMainPageButton } from './ToMainPageButton/ToMainPageButton';
import { UserButton } from './UserButton/UserButton';
import { modalActionType, modalType } from '../../model/types/types';

interface Props {
	className?: string;
}

export const ActionPanel = memo((props: Props) => {
    const { className } = props;
    const [isPrintModal, setIsPrintModal] = useState(false);
    const [isReportModal, setIsReportModal] = useState(false);


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

    return (
        <HStack maxHeight className={className}>

            <ToMainPageButton />

            <ToAdminPageButton />

            <UserButton />

            <ServicePanel onModalAction={onModalAction}/>

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
