import { useState, useEffect } from 'react';

import { FlexGap } from "@/shared/ui/Stack";
import { TextSize } from "@/shared/ui/Text";

// TODO - выпилить? вроде больше нигде не используется и не нужен, т.к. перевел проект на медиазапросы

/**
 * Хук возвращает набор размеров в зависимости от разрешения экрана
 * @param text - Размер текста (для компонента Text)
 * @param gap -  Размер отступа (для HStack/VStack)
 * @param sizeClass - Имя класса
*/

type sizeType = {
    text: TextSize,
    gap: FlexGap,
    sizeClass: 'small' | 'mini' | 'micro'
}

export const useWindowHeightMeter = () => {
    const [windowHeigth, setWindowHeight] = useState(window.innerHeight)

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight)
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []);

    const size:sizeType  = {
        text: 's',
        gap: '16',
        sizeClass: 'small'
    }

    // if (windowHeigth < 700) {
    //     size.text = 'xxs';
    //     size.gap = '4';
    //     size.sizeClass = 'micro'

    //     return size
    // }

    // if (windowHeigth < 900) {
    //     size.text = 'xs';
    //     size.gap = '8';
    //     size.sizeClass = 'mini'

    //     return size
    // }
    
    return size
}