import { memo} from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './AnchorItem.module.scss';
import { aboutItem } from '../../../model/types/navigation';
import gen from '../styles/general.module.scss';


interface AnchorItemProps{
	className?: string;
    data: aboutItem
}

export const AnchorItem = memo(({ className, data }: AnchorItemProps) => {

    return (
        <VStack
            className={classNames(cls.AnchorItem, {}, [className])}
        >
            <a href={data.anchor}>
                <Text
                    text={data.title}
                    variant='inverted'
                    className={classNames(
                        gen.head,
                        {},
                        [gen.headLink]
                    )}
                    size='s'
                />
            </a>
            {data.child && data.child.map((x, i) =>
                <AnchorItem data={x} key={i} />)
            }
        </VStack>
    );
});
