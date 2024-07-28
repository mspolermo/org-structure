import { observer } from 'mobx-react';
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { PersonViewStore } from '@/entities/Person';
import { fetchPersonDetails } from '@/entities/Person/model/services/fetchPersonDetails';
import { Person } from '@/entities/Person/model/types/person';
import { Star2 } from '@/shared/assets/svg-icons/action';
import { Pencil } from '@/shared/assets/svg-icons/button';
import { Briefcase, GoToDetails } from '@/shared/assets/svg-icons/status';
import { getRouteEditPerson, getRouteFavorites } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getColor } from '@/shared/lib/getColors/getColors';
import { getInitials } from '@/shared/lib/getInitials/getInitials';
import { Icon } from '@/shared/ui/Icon';
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
    // TODO : заготовка для получения деталей
    // const editBtn = useStoreRetrieve<personDetails>({
    //     storeField: store.personFast,
    //     pendindElement: null,
    //     fulfilledElement: (v) => {
    //         if (!v.canEdit) return null
    //         return (
    //             <Tooltip text='Редактировать'>
    //                 <Icon
    //                     borderType='soft'
    //                     Svg={Pencil}
    //                     clickable
    //                     onClick={()=> navigate(getRouteEditPerson(id))}
    //                 />
    //             </Tooltip>
    //         )
    //     }
    // });

    // const appointments = useStoreRetrieve<personDetails>({
    //     storeField: store.personFast,
    //     pendindElement: <Skeleton height={'120px'}/>,
    //     fulfilledElement: (v) => {
    //         const appointmentsList = v.appointments.map( (e, i) => {
    //             return <Text key={i} text={`${e.orgUnitName}, ${e.post}`} size='s'/>
    //         })
                
    //         return <VStack>
    //             {appointmentsList}
    //         </VStack>}
    // });

    return (
        <VStack max gap='8' className={classNames(cls.PersonDetails, {}, [className])}>
            <HStack max gap='16' align='start'>
                <VStack gap='8' align='center'>
                    <Text size='s' text={person.email} align='right' className={cls.href}/>
                    <VStack 
                        align='center'
                        justify='center'
                        style={{'backgroundColor': getColor(id)}}
                        className={cls.photo}
                    >
                        {getInitials(personFullName)}
                    </VStack>
                    <HStack gap='8'>
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
                        <Tooltip text='Редактировать'>
                            <Icon
                                borderType='soft'
                                Svg={Pencil}
                                clickable
                                onClick={()=> navigate(getRouteEditPerson(id))}
                            />
                        </Tooltip>
                    </HStack>
                </VStack>

                <HStack max align='start'>
                    <VStack max gap='4' align='start'>
                        <HStack gap='4' justify='between'>
                            <Text text='Табельный номер:'/>
                            <Text text={person.table}/>
                        </HStack>
                        <HStack gap='4' justify='between'>
                            <Text text='Дата рождения:'/>
                            <Text text={new Date(person.birthday).getFullYear().toString()}/>
                        </HStack>

                        <HStack max gap='8' align='start'>
                            <Text text='Рабочее место:' size='m'/>
                            <Text text={person.location} size='m'/>
                        </HStack>
                        <HStack max gap='8' align='start'>
                            <Text text='Телефон:' size='m'/>
                            <Text text={person.phone} size='m'/>
                        </HStack>
                    </VStack>

                    <VStack max gap='24'>
                        <HStack gap='4' justify='between'>
                            <Text text='Дата приема на работу:'/>
                            <Text text={new Date(person.employmentDate).getFullYear().toString()}/>
                        </HStack>

                        <HStack max gap='16' align='start'>
                            <Text text='Назначения:' size='m'/>
                            <VStack gap='4' className={cls.rows} align='start' max>
                                {person.isChef && <Text text='- Начальник' size='m'/> }
                                {person.isManager && <Text text='- Менеджер' size='m'/> }
                                <Text text={`- ${person.post}`} size='m'/>
                            </VStack>
                        </HStack>

                        <HStack gap='4' maxHeight justify='end'>
                            <Text text='GUID:' size='m'/>
                            <Text text={id} className={cls.id} size='m'/>
                        </HStack>
                    </VStack>
                </HStack>

            </HStack>
        </VStack>
    );
});
