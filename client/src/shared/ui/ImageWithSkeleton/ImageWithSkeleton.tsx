/**
 * Компонент для вставки изображения ссо скелетоном во время загрузки и выводом ошибки
 * @param className? - Проброс класса сверху
 * @param src - Изображение
 * @param alt - Подпись к изображению
 * @param height - Высота
 * @param width - Ширина
 * @param border - Сглаживание углов
*/
import React, { CSSProperties, useState } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';

import cls from './ImageWithSkeleton.module.scss';

interface Props {
    className?: string;
    src: string;
    alt: string;
    width?: string | number;
    height?: string | number;
    border?: string | number;
}

const ImageWithSkeleton: React.FC<Props> = (props) => {
    const { src, alt, width = '100%', height = 'auto', border = 0, className } = props;
    const [loaded, setLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const containerStyle: CSSProperties = {
        position: 'relative',
        width,
        height,
        borderRadius: border,
        overflow: 'hidden',
    };

    const imageStyle: CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        display: loaded ? 'block' : 'none',
    };

    if (hasError) return (
        <div style={containerStyle} className={cls.error} title={alt}>
            <Text
                variant='error'
                title="Ошибка: Не удалось загрузить изображение"
                size="s"
            />
        </div>
    )

    return (
        <div style={containerStyle} className={classNames(cls.container, {}, [className])} title={alt}>
            {!loaded && !hasError && (
                <Skeleton width="100%" height="100%" border={border} />
            )}
            <img
                src={src}
                alt={alt}
                style={imageStyle}
                onLoad={() => setLoaded(true)}
                onError={() => {
                    setLoaded(true);
                    setHasError(true);
                }}
            />
        </div>
    );
};

export default ImageWithSkeleton;
