import { memo, useCallback, useEffect, useState } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { formatDateToISO } from '@/shared/lib/formatDate/formatDate';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { ListBox, ListBoxItem } from '@/shared/ui/Popups';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Toggle } from '@/shared/ui/Toggle';

import cls from './PersonCreationCard.module.scss';
import { PersonCreateData } from '../../model/types/person';


interface Props {
    className?: string;
    orgUnitsList: ListBoxItem<string>[]
    resetFlag: boolean
    setPersonData: React.Dispatch<React.SetStateAction<PersonCreateData | undefined>>
}

export const PersonCreationCard = memo((props: Props) => {
    const { className, orgUnitsList, resetFlag, setPersonData} = props

    const [orgUnitId, setOrgUnitId] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [location, setLocation] = useState('')
    const [post, setPost] = useState('')
    const [email, setEmail] = useState('')
    const [birthday, setBirthday] = useState('')
    const [employmentDate, setEmploymentDate] = useState('')
    const [table, setTable] = useState('')
    const [isChef, setIsChef] = useState(false)
    const [isManager, setIsManager] = useState(false)

    const isDate  = (value: string) => /^\d{2}\/\d{2}\/\d{4}$/.test(value);

    const resetToDefault = useCallback( () => {
        setName('')
        setPhone('')
        setLocation('')
        setPost('')
        setEmail('')
        setBirthday('')
        setTable('')
        setEmploymentDate('')
        setIsChef(false)
        setIsManager(false)
    }, []);

    useEffect(() => {
        
        setPersonData ({
            name,
            phone: phone || null,
            location,
            post,
            email,
            birthday: isDate(birthday) ? new Date(formatDateToISO(birthday)) : null,
            isChef,
            isManager,
            orgUnitId: orgUnitId,
            table: table || null,
            employmentDate: isDate(employmentDate) ? new Date(formatDateToISO(employmentDate)) : null
        })
    }, [birthday, email, employmentDate, isChef, isManager, location, name, orgUnitId, phone, post, setPersonData, table])

    useEffect(() => {
        resetToDefault()
    }, [resetFlag, resetToDefault])

    return (
        <Card border='border-slightly' padding='24' max className={classNames(cls.card, {}, [className])}>
            <VStack gap="16" max>

                <Text title="Общая информация" size="xl"/>

                <VStack gap="8" max>

                    <HStack gap="4" max>
                        <Text title={'Имя:'} thin className={cls.text}/>
                        <Input 
                            inputVariant="bordered"
                            placeholder="ФИО сотрудника"
                            value={name}
                            onChange={setName}
                        />
                    </HStack>
                    <HStack gap="4" max>
                        <Text title="Телефон:" thin className={cls.text}/>
                        <Input
                            inputVariant="bordered"
                            placeholder="Номер телефона (опционально)"
                            value={phone}
                            onChange={setPhone}
                        />
                    </HStack>
                    <HStack gap="4" max>
                        <Text title="Расположение:" thin className={cls.text}/>
                        <Input
                            inputVariant="bordered"
                            placeholder="Расположение"
                            value={location}
                            onChange={setLocation}
                        />
                    </HStack>
                    <HStack gap="4" max>
                        <Text title="Должность:" thin className={cls.text}/>
                        <Input
                            inputVariant="bordered"
                            placeholder="Должность"
                            value={post}
                            onChange={setPost}
                        />
                    </HStack>
                    <HStack gap="4" max>
                        <Text title="Email:" thin className={cls.text}/>
                        <Input
                            inputVariant="bordered"
                            placeholder="Почтовый адрес"
                            value={email}
                            onChange={setEmail}
                        />
                    </HStack>
                    <HStack gap="4" max>
                        <Text title="Дата рождения:" thin withoutWrap className={cls.text}/>
                        <Input
                            inputVariant="bordered"
                            placeholder="Дата рождения (день/месяц/год)"
                            value={birthday}
                            onChange={setBirthday}
                        />
                    </HStack>
                    <HStack gap="4" max>
                        <Text title="Табельный номер:" thin withoutWrap className={cls.text}/>
                        <Input
                            inputVariant="bordered"
                            placeholder="Табельный номер (опционально)"
                            value={table}
                            onChange={setTable}
                        />
                    </HStack>
                    <HStack gap="4" max>
                        <Text title="Дата устройства:" thin withoutWrap className={cls.text}/>
                        <Input
                            inputVariant="bordered"
                            placeholder="Дата устройства на работу (день/месяц/год)"
                            value={employmentDate}
                            onChange={setEmploymentDate}
                        />
                    </HStack>
                </VStack>
            


                <VStack gap="8">
                    <Text title="Дополнительные настройки" size="xl"/>
                    <HStack gap="4">
                        <Text title="Отдел:" thin className={cls.text}/>

                        <ListBox
                            className={cls.listbox}
                            items={orgUnitsList}
                            value={orgUnitId}
                            defaultValue='Выберите отдел'
                            onChange={setOrgUnitId}
                        />

                    </HStack>
                    <VStack gap="8" className={cls.tooglers}>
                        <Toggle 
                            label="Начальник отдела" 
                            value={isChef}
                            onChange={setIsChef}
                        />
                        <Toggle 
                            label="Менеджер отдела" 
                            value={isManager}
                            onChange={setIsManager}
                        />
                    </VStack>
                </VStack>


            </VStack>
        </Card>
    )}
);
