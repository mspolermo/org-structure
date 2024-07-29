import { observer } from 'mobx-react';
import { useCallback } from 'react';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import { Collapse, Expand } from '@/shared/assets/svg-icons/status';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/Icon';

interface CollapseAllOrgUnitsBtnProps {
    className?: string;
}

export const CollapseAllOrgUnitsBtn = observer((props: CollapseAllOrgUnitsBtnProps) => {
    const { className } = props;
    const { 
        orgUnitStore: {
            collapseAllOrgUnitCards,
            updateCollapseAllOrgUnitCards
        }
    } = useStoreProvider();

    const clickHandler = useCallback(() => 
        updateCollapseAllOrgUnitCards(!collapseAllOrgUnitCards), [collapseAllOrgUnitCards, updateCollapseAllOrgUnitCards]
    );

    return (
        <Icon
            Svg={collapseAllOrgUnitCards ? Expand : Collapse}
            clickable
            onClick={clickHandler}
            width={20}
            height={20}
            color='inverted'
            className={classNames('', {}, [className])}
        />
    );
});
