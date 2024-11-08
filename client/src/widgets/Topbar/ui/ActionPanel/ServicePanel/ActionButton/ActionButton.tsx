import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/Icon';
import { VStack } from '@/shared/ui/Stack';
import { Tooltip } from '@/shared/ui/Tooltip';

import cls from './ActionButton.module.scss';

interface ActionButtonProps {
	className?: string;
    action: () => void;
    tooltipText: string;
    Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

export const ActionButton = memo((props: ActionButtonProps) => {

    const {
        className,
        action,
        tooltipText,
        Svg
    } = props;

    return (
        <div
            className={classNames(cls.ActionButton, {}, [className])}
            onClick={action}
        > 
            <Tooltip text={tooltipText} maxHeight maxWidth>
                <VStack className={cls.iconWrapper} align='center' justify='center'>
                    <Icon
                        Svg={Svg}
                        className={cls.icon}
                    />                        
                </VStack>
            </Tooltip>
        </div>
    );
});
