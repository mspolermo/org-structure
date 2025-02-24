import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import PersonStore from '@/entities/Person/model/store/personStore';
import { Person } from '@/entities/Person/model/types/person';
import { addToFavorites, deleteFavorite, fetchFavorites } from '@/entities/User';
import { Star2, StarFilled } from '@/shared/assets/svg-icons/action';
import { Pencil } from '@/shared/assets/svg-icons/button';
import { Briefcase, GoToDetails } from '@/shared/assets/svg-icons/status';
import { getRouteEditPerson, getRouteViewPerson } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { formatDate } from '@/shared/lib/formatDate/formatDate';
import { getColor } from '@/shared/lib/getColors/getColors';
import { getInitials } from '@/shared/lib/getInitials/getInitials';
import { Icon } from '@/shared/ui/Icon';
import { VStack, HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Tooltip } from '@/shared/ui/Tooltip';

import cls from './PersonDetalesView.module.scss';
import PersonDetalesModal from '../PersonDetalesModal/PersonDetalesModal';

interface Props {
	className?: string;
    person: Person;
    isEditable: boolean;
    store: PersonStore;
}

export const PersonDetalesView = observer((props: Props) => {
    const { className, person, isEditable, store } = props;
    const {id, name: personFullName} = person;
    const navigate = useNavigate();
    const { rootStore } = useStoreProvider();
    const [isFavorite, setIsFavorite] = useState(rootStore.favorites?.some((x: Person) => x.id === person.id))
    const [isDetalesModalOpen, setDetalesModalOpen] = useState(false);

    const favoriteBtnHandler = useCallback(async () => {
        if (!rootStore.auth) return;
    
        try {
            if (!isFavorite) {
                await addToFavorites(person.id, rootStore.auth);
            } else {
                await deleteFavorite(person.id, rootStore.auth);
            }
            
            const response = await fetchFavorites(rootStore.auth);
            
            runInAction(() => {
                rootStore.updateFavorites(response);
                setIsFavorite(response.some((x: Person) => x.id === person.id));
            });
        } catch (e) {
            console.error("Ошибка при обновлении избранного:", e);
        }
    }, [isFavorite, person.id, rootStore]);

    // Обработчик для открытия модалки "Комплекты и приложения"
    const openDetalesModal = useCallback(() => {
        setDetalesModalOpen(true);
    }, []);

    // Обработчик для закрытия модалки
    const closeDetalesModal = useCallback(() => {
        setDetalesModalOpen(false);
    }, []);

    return (
        <>
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
                            <Tooltip text={isFavorite ? 'Из избранного' : 'В избранное'}>
                                <Icon
                                    Svg={isFavorite ? StarFilled : Star2}
                                    borderType='soft'
                                    stroke={'var(--icon-color)'}
                                    fill={'var(--icon-color)'}
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
                                    onClick={()=> navigate(getRouteViewPerson(id))}
                                />
                            </Tooltip> 
                            <Tooltip text='Комплекты и приложения'>
                                <Icon
                                    Svg={GoToDetails}
                                    borderType='soft'
                                    stroke={'var(--icon-color)'}
                                    clickable
                                    onClick={openDetalesModal}
                                />
                            </Tooltip> 
                            {isEditable && <Tooltip text='Редактировать'>
                                <Icon
                                    borderType='soft'
                                    Svg={Pencil}
                                    clickable
                                    onClick={()=> navigate(getRouteEditPerson(id))}
                                />
                            </Tooltip>}
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
                                <Text text={formatDate(person.birthday.toString())}/>
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
                                <Text text={formatDate(person.employmentDate.toString())}/>
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
            {isDetalesModalOpen && (
                <PersonDetalesModal
                    isOpen={isDetalesModalOpen}
                    onCloseModal={closeDetalesModal}
                    personId={person.id}
                    store={store}
                />
            )}
        </>
    );
});
