import { observer } from 'mobx-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

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

    const splitedName = useMemo(() => {
        const parts = person.name.split(' ');
        return [parts[0] ?? '', parts[1] ?? '', parts[2] ?? ''];
    }, [person.name]);
    

    const [name, setName] = useState(splitedName[1] ?? '')
    const [secondName, setSecondName] = useState(splitedName[2] ?? '')
    const [surName, setSurName] = useState(splitedName[0] ?? '')

    const [phone, setPhone] = useState(person.phone)
    const [location, setLocation] = useState(person.location)
    const [post, setPost] = useState(person.post)
    const [email ,setEmail] = useState(person.email)
    const [birthday, setBirthday] = useState(formatDate(person.birthday.toString()))

    const [isChef, setIsChef] = useState(person.isChef);
    const [isManager, setIsManager] = useState(person.isManager);

    const resetToDefault = useCallback(() => {
        setName(splitedName[1])
        setSecondName(splitedName[2])
        setSurName(splitedName[0])
        setPhone(person.phone)
        setLocation(person.location)
        setPost(person.post)
        setEmail(person.email)
        setBirthday(formatDate(person.birthday.toString()))
        setIsChef(person.isChef)
        setIsManager(person.isManager)
    }, [person.birthday, person.email, person.isChef, person.isManager, person.location, person.phone, person.post, splitedName])

    useEffect(() => {
        const fullname = [surName, name, secondName].join(' ');

        setUpdatedPerson({
            name: fullname,
            phone,
            location,
            post,
            email,
            birthday: new Date(formatDateToISO(birthday)),
            isChef,
            isManager,
        })
    }, [birthday, email, isChef, isManager, location, name, phone, post, secondName, setUpdatedPerson, surName])

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
                            <Text title={'Фамилия:'} thin className={cls.text}/>
                            <Input 
                                inputVariant="bordered"
                                placeholder="Фамилия сотрудника"
                                value={surName}
                                onChange={setSurName}
                                readonly={!isEdit}
                            />
                        </HStack>
                        <HStack gap="4" max>
                            <Text title={'Имя:'} thin className={cls.text}/>
                            <Input 
                                inputVariant="bordered"
                                placeholder="Имя сотрудника"
                                value={name}
                                onChange={setName}
                                readonly={!isEdit}
                            />
                        </HStack>
                        <HStack gap="4" max>
                            <Text title={'Отчество:'} thin className={cls.text}/>
                            <Input 
                                inputVariant="bordered"
                                placeholder="Отчество сотрудника"
                                value={secondName}
                                onChange={setSecondName}
                                readonly={!isEdit}
                            />
                        </HStack>
                        <HStack gap="4" max>
                            <Text title="Телефон:" thin className={cls.text}/>
                            <Input
                                inputVariant="bordered"
                                placeholder="Номер телефона"
                                value={phone}
                                onChange={setPhone}
                                readonly={!isEdit}
                            />
                        </HStack>
                        <HStack gap="4" max>
                            <Text title="Расположение:" thin className={cls.text}/>
                            <Input
                                inputVariant="bordered"
                                placeholder="Расположение"
                                value={location}
                                onChange={setLocation}
                                readonly={!isEdit}
                            />
                        </HStack>
                        <HStack gap="4" max>
                            <Text title="Должность:" thin className={cls.text}/>
                            <Input
                                inputVariant="bordered"
                                placeholder="Должность"
                                value={post}
                                onChange={setPost}
                                readonly={!isEdit}
                            />
                        </HStack>
                        <HStack gap="4" max>
                            <Text title="Email:" thin className={cls.text}/>
                            <Input
                                inputVariant="bordered"
                                placeholder="Почтовый адрес"
                                value={email}
                                onChange={setEmail}
                                readonly={!isEdit}
                            />
                        </HStack>
                        <HStack gap="4" max>
                            <Text title="Дата рождения:" thin withoutWrap className={cls.text}/>
                            <Input
                                inputVariant="bordered"
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
