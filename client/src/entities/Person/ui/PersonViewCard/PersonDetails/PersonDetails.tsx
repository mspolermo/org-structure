import { observer } from 'mobx-react';
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { PersonViewStore } from '@/entities/Person';
import { fetchPersonDetails } from '@/entities/Person/model/services/fetchPersonDetails';
import { Person, personDetails } from '@/entities/Person/model/types/person';
import { Star2 } from '@/shared/assets/svg-icons/action';
import { Pencil } from '@/shared/assets/svg-icons/button';
import { Briefcase, GoToDetails } from '@/shared/assets/svg-icons/status';
import { getRouteEditPerson, getRouteFavorites } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getColor } from '@/shared/lib/getColors/getColors';
import { getInitials } from '@/shared/lib/getInitials/getInitials';
import { useStoreRetrieve } from '@/shared/lib/hooks/useStoreRetrieve/useStoreRetrieve';
import { Icon } from '@/shared/ui/Icon';
import { Skeleton } from '@/shared/ui/Skeleton';
import { VStack, HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Tooltip } from '@/shared/ui/Tooltip';

import cls from './PersonDetails.module.scss';

interface PersonDetailsProps {
	className?: string;
    person: Person;
    store: PersonViewStore;
}

export const PersonDetails = observer(({ className, person, store }: PersonDetailsProps) => {
    const {id, name: personFullName} = person;
    const navigate = useNavigate();

    useEffect(() => {
        if (store.personFast == undefined) {
            fetchPersonDetails(id, store)
        }
    }, [id, store])

    const favoriteBtnHandler = useCallback(()=> navigate(getRouteFavorites()), [navigate]);

    const editBtn = useStoreRetrieve<personDetails>({
        storeField: store.personFast,
        pendindElement: null,
        fulfilledElement: (v) => {
            if (!v.canEdit) return null
            return (
                <Tooltip text='Редактировать'>
                    <Icon
                        borderType='soft'
                        Svg={Pencil}
                        clickable
                        onClick={()=> navigate(getRouteEditPerson(id))}
                    />
                </Tooltip>
            )
        }
    });
    
    const appointments = useStoreRetrieve<personDetails>({
        storeField: store.personFast,
        pendindElement: <Skeleton height={'120px'}/>,
        fulfilledElement: (v) => {
            const appointmentsList = v.appointments.map( (e, i) => {
                return <Text key={i} text={`${e.orgUnitName}, ${e.post}`} size='s'/>
            })
                
            return <VStack>
                {appointmentsList}
            </VStack>}
    });

    return (
        <VStack max gap='8' className={classNames(cls.PersonDetails, {}, [className])}>
            <HStack max gap='16' align='start'>
                <VStack gap='8' align='center'>
                    <Text size='s' text='exampleAA@novator.ru' align='right' className={cls.href}/>
                    <VStack 
                        align='center'
                        justify='center'
                        style={{'backgroundColor': getColor(id)}}
                        className={cls.photo}
                    >
                        {getInitials(personFullName)}
                    </VStack>
                    <HStack gap='8'>
                        {editBtn}
                        <Tooltip text='В избранное'>
                            <Icon
                                Svg={Star2}
                                borderType='soft'
                                stroke={'var(--icon-color)'}
                                clickable
                                onClick={favoriteBtnHandler}
                            />
                        </Tooltip> 
                        <Tooltip text='Информация о сотруднике'>
                            <Icon
                                Svg={Briefcase} 
                                borderType='soft'
                                stroke={'var(--icon-color)'}
                                clickable
                                onClick={()=> {}}
                            />
                        </Tooltip> 
                        <Tooltip text='Комплекты и приложения'>
                            <Icon
                                Svg={GoToDetails}
                                borderType='soft'
                                stroke={'var(--icon-color)'}
                                clickable
                                onClick={()=> {}}
                            />
                        </Tooltip> 
                    </HStack>
                </VStack>

                <HStack max>
                    <VStack max gap='4' align='start'>
                        <HStack gap='4' justify='between'>
                            <Text text='Табельный номер:'/>
                            <Skeleton width={'50px'} height={'15px'}></Skeleton>
                        </HStack>
                        <HStack gap='4' justify='between'>
                            <Text text='Дата рождения:'/>
                            <Skeleton width={'100px'} height={'15px'}></Skeleton>
                        </HStack>
                        <HStack gap='4' justify='between'>
                            <Text text='Форма допуска:'/>
                            <Skeleton width={'160px'} height={'15px'}></Skeleton>
                        </HStack>
                        <HStack gap='4'>
                            <Text text='ZupId:' size='m'/>
                            <Text text={id} className={cls.id} size='s'/>
                        </HStack>
                        <HStack gap='4'>
                            <Text text='Id:' size='m'/>
                            <Text text={id} className={cls.id} size='s'/>
                        </HStack>
                    </VStack>
                    
                    <VStack max gap='8'>
                        <HStack max gap='4' align='start'>
                            <Text text='Аттестация:'/>
                            <VStack gap='4' className={cls.rows}>
                                <Skeleton width={'60%'} height={'15px'}></Skeleton>
                                <Skeleton width={'60%'} height={'15px'}></Skeleton>
                            </VStack>
                        </HStack>
                        <HStack max gap='4' align='start'>
                            <Text text='Назначения:' size='m'/>
                            <VStack gap='4' className={cls.rows}>
                                {appointments}
                            </VStack>
                        </HStack>
                        <HStack max gap='4' align='start'>
                            <Text text='Подчинения:' size='m'/>
                            <VStack gap='4' className={cls.rows}>
                                <Skeleton width={'60%'} height={'15px'}></Skeleton>
                                <Skeleton width={'60%'} height={'15px'}></Skeleton>
                            </VStack>
                        </HStack>
                        <HStack max gap='4' align='start'>
                            <Text text='Роли:' size='m'/>
                            <VStack gap='4' className={cls.rows}>
                                <Skeleton width={'60%'} height={'15px'}></Skeleton>
                                <Skeleton width={'60%'} height={'15px'}></Skeleton>
                            </VStack>
                        </HStack>
                    </VStack>
                </HStack>

            </HStack>
        </VStack>
    );
});
