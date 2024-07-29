import { observer } from 'mobx-react';
import { useMemo, useCallback } from 'react';

import { Plus } from '@/shared/assets/svg-icons/control';
import { Minus } from '@/shared/assets/svg-icons/status';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ExpandableCard } from '@/shared/ui/ExpandableCard';

import cls from './OrgUnitItemView.module.scss';
import OrgUnitViewStore from '../../../model/store/orgUnitIViewStore';
import { OrgUnitItem } from '../../../model/types/orgUnitItem';
import { OrgUnitItemDetails } from '../OrgUnitItemDetails/OrgUnitItemDetails';
import { OrgUnitItemShort } from '../OrgUnitItemShort/OrgUnitItemShort';

interface OrgUnitItemViewProps {
	className?: string;
    orgUnitItem: OrgUnitItem;
    cardStore: OrgUnitViewStore;
}

export const OrgUnitItemView = observer((props: OrgUnitItemViewProps) => {
    const {
        className,
        orgUnitItem,
        cardStore: {
            isPersonsCollapsed,
            updateIsPersonsCollapsed,
            cardOpeningStatus,
            updateCardOpeningStatus
        }
    } = props;

    const collapseHandler = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        updateIsPersonsCollapsed(!isPersonsCollapsed)
    }, [isPersonsCollapsed, updateIsPersonsCollapsed]);

    const icons =  useMemo(() => [
        {
            Svg: isPersonsCollapsed ? Plus : Minus,
            onClick: collapseHandler
        }
    ], [collapseHandler, isPersonsCollapsed]);
    
    return (
        <ExpandableCard
            className={classNames('', {[cls.Collapsed]: isPersonsCollapsed}, [className])}
            isOpen={cardOpeningStatus}
            setIsOpen={updateCardOpeningStatus}
            shortView={
                <OrgUnitItemShort
                    orgUnitItem={orgUnitItem}
                    isOpen={cardOpeningStatus}
                    setIsOpen={updateCardOpeningStatus}
                />
            }
            expandableView={<OrgUnitItemDetails orgUnitItem={orgUnitItem}/>}
            withBorder
            withButtons
            icons={icons}
        />
    );
});
