import { observer } from 'mobx-react';
import { useCallback, useEffect, useState } from 'react';

import { Person, PersonUpdateData } from '@/entities/Person/model/types/person';
import { classNames } from '@/shared/lib/classNames/classNames';
import { formatDate, formatDateToISO } from '@/shared/lib/formatDate/formatDate';
import { getColor } from '@/shared/lib/getColors/getColors';
import { getInitials } from '@/shared/lib/getInitials/getInitials';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Toggle } from '@/shared/ui/Toggle';

import cls from './PersonInfoBlock.module.scss';

interface Props {
	className?: string;
    person: Person;
    isEdit: boolean;
    isCancelled: boolean;
    setUpdatedPerson: React.Dispatch<React.SetStateAction<PersonUpdateData | null>>
}

export const PersonInfoBlock = observer((props: Props) => {
    const { className, isEdit, person, isCancelled, setUpdatedPerson } = props

    const [name, setName] = useState(person.name)
    const [phone, setPhone] = useState(person.phone)
    const [location, setLocation] = useState(person.location)
    const [post, setPost] = useState(person.post)
    const [email ,setEmail] = useState(person.email)
    const [birthday, setBirthday] = useState(formatDate(person.birthday.toString()))

    const [isChef, setIsChef] = useState(person.isChef);
    const [isManager, setIsManager] = useState(person.isManager);

    const resetToDefault = useCallback(() => {
        setName(person.name)
        setPhone(person.phone)
        setLocation(person.location)
        setPost(person.post)
        setEmail(person.email)
        setBirthday(formatDate(person.birthday.toString()))
        setIsChef(person.isChef)
        setIsManager(person.isManager)
    }, [person.birthday, person.email, person.isChef, person.isManager, person.location, person.name, person.phone, person.post])

    useEffect(() => {
        setUpdatedPerson({
            name,
            phone,
            location,
            post,
            email,
            birthday: new Date(formatDateToISO(birthday)),
            isChef,
            isManager,
        })
    }, [birthday, email, isChef, isManager, location, name, phone, post, setUpdatedPerson])

    useEffect(() => {
        resetToDefault()
    } ,[isCancelled, resetToDefault])

    return (
        <Card border='border-slightly' padding='24' max className={classNames(cls.PersonInfoBlock, {}, [className])}>
            <VStack gap="16" max>

                <Text title="Общая информация" size="xl"/>

                <HStack max gap='32'>
                    <VStack 
                        align='center'
                        justify='center'
                        style={{'backgroundColor': getColor(person.id)}}
                        className={cls.photo}
                    >
                        {getInitials(name)}
                    </VStack>
            
                    <VStack gap="8" max>
                        
                
                        <HStack gap="4" max>
                            <Text title={'Имя:'} thin className={cls.text}/>
                            <Input 
                                inputVariant="clear"
                                className={cls.input}
                                placeholder="ФИО сотрудника"
                                value={name}
                                onChange={setName}
                                readonly={!isEdit}
                            />
                        </HStack>
                        <HStack gap="4" max>
                            <Text title="Телефон:" thin className={cls.text}/>
                            <Input
                                inputVariant="clear"
                                className={cls.input}
                                placeholder="Номер телефона"
                                value={phone}
                                onChange={setPhone}
                                readonly={!isEdit}
                            />
                        </HStack>
                        <HStack gap="4" max>
                            <Text title="Расположение:" thin className={cls.text}/>
                            <Input
                                inputVariant="clear"
                                className={cls.input}
                                placeholder="Расположение"
                                value={location}
                                onChange={setLocation}
                                readonly={!isEdit}
                            />
                        </HStack>
                        <HStack gap="4" max>
                            <Text title="Должность:" thin className={cls.text}/>
                            <Input
                                inputVariant="clear"
                                className={cls.input}
                                placeholder="Должность"
                                value={post}
                                onChange={setPost}
                                readonly={!isEdit}
                            />
                        </HStack>
                        <HStack gap="4" max>
                            <Text title="Email:" thin className={cls.text}/>
                            <Input
                                inputVariant="clear"
                                className={cls.input}
                                placeholder="Почтовый адрес"
                                value={email}
                                onChange={setEmail}
                                readonly={!isEdit}
                            />
                        </HStack>
                        <HStack gap="4" max>
                            <Text title="Дата рождения:" thin withoutWrap className={cls.text}/>
                            <Input
                                inputVariant="clear"
                                className={cls.input}
                                placeholder="Дата рождения"
                                value={birthday}
                                onChange={setBirthday}
                                readonly={!isEdit}
                            />
                        </HStack>
                    </VStack>
                </HStack>


                <VStack gap="8">
                    <Text title="Дополнительные настройки" size="xl"/>
                    <Toggle 
                        label="Начальник отдела" 
                        value={isChef}
                        onChange={setIsChef}
                        readonly={!isEdit}
                    />
                    <Toggle 
                        label="Менеджер отдела" 
                        value={isManager}
                        onChange={setIsManager}
                        readonly={!isEdit}
                    />
                </VStack>


            </VStack>
        </Card>
    );
});
