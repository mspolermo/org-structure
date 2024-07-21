import { memo, useCallback } from 'react';

import { ChevronUp } from '@/shared/assets/svg-icons/status';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/Icon';

interface ScrollToTopButtonProps {
    className?: string;
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
    const { className } = props;

    const clickHandler = useCallback(() => {
        document.querySelector('#topBorder')?.scrollIntoView({behavior: 'smooth'})
    }, []);

    return (
        <Icon
            Svg={ChevronUp}
            clickable
            onClick={clickHandler}
            width={16}
            height={16}
            color='inverted'
            className={classNames('', {}, [className])}
        />
    );
});
