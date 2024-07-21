import { memo, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

import { ChevronLeft } from '@/shared/assets/svg-icons/status';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/Icon';

interface ReturnToPreviousPageBtnProps {
    className?: string;
}

export const ReturnToPreviousPageBtn = memo((props: ReturnToPreviousPageBtnProps) => {
    const { className } = props;
    const navigate = useNavigate();

    const onReturnHandler = useCallback(() =>navigate(-1), [navigate]);

    return (
        <Icon
            Svg={ChevronLeft}
            clickable
            onClick={onReturnHandler}
            width={16}
            height={16}
            color='inverted'
            className={classNames('', {}, [className])}
        />
    );
});
