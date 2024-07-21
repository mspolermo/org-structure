import { observer } from 'mobx-react';

import { getRouteDepartment } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { getHStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './NavItem.module.scss';
import { NavGroupType } from '../../../model/types/navigation';
import gen from '../styles/general.module.scss';

interface NavItemProps{
	className?: string;
    data: NavGroupType;
}

export const NavItem = observer(({ className, data }: NavItemProps) => {
    const { name: Name, items: Items} = data;

    return (
        <li
            className={classNames(
                cls.NavItem,
                {},
                [className, gen.item, getHStack({'align': 'center'})]
            )}
        >
            {Name.isLink && 
                <AppLink
                    to={getRouteDepartment(Name.id)}
                    activeClassName={gen.active}
                >
                    <Text
                        text={Name.name}
                        variant='inverted'
                        size='s'
                        className={classNames(
                            gen.head,
                            {[gen.headLink]: Name.isLink},
                            []
                        )}
                    />
                </AppLink>
            }
            {!Name.isLink && 
            <Text
                size='s'
                text={Name.name}
                variant='inverted'
                className={classNames(
                    gen.head,
                    {[gen.headLink]: Name.isLink},
                    []
                )}
            />
            }
            {Items.map(x => 
                <AppLink
                    to={getRouteDepartment(x.id)}
                    key={x.id}
                    activeClassName={gen.active}
                >
                    <Text
                        size='s'
                        className={cls.innerItem}
                        text={x.name}
                        variant='inverted'
                    />
                </AppLink>
            )}
        </li>
    );
});
