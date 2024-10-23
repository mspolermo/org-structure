import { observer } from 'mobx-react';
import { useCallback, useState  } from "react";
import { useNavigate } from "react-router-dom";

import { classNames } from '@/shared/lib/classNames/classNames';
import { formatDate } from '@/shared/lib/formatDate/formatDate';
import { getColor } from '@/shared/lib/getColors/getColors';
import { getInitials } from '@/shared/lib/getInitials/getInitials';
import { Button } from "@/shared/ui/Button";
import { Card } from '@/shared/ui/Card';
import { Input } from "@/shared/ui/Input";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Toggle } from "@/shared/ui/Toggle";

import cls from './PersonFullView.module.scss';
import { Person, PersonDetales } from '../../model/types/person';

interface PersonFullViewProps {
	className?: string;
    person: Person;
    personDetales: PersonDetales
}

export const PersonFullView = observer(({ className, person, personDetales }: PersonFullViewProps) => {
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false)

    const [name, setName] = useState(person.name)
    const [phone, setPhone] = useState(person.phone)
    const [location, setLocation] = useState(person.location)
    const [post, setPost] = useState(person.post)
    const [email ,setEmail] = useState(person.email)
    const [birthday, setBirthday] = useState(formatDate(person.birthday.toString()))

    const onReturnHandler = useCallback(() =>navigate(-1), [navigate]);
    const onEditToggle = useCallback(() => setIsEdit(prev => !prev), []);

    const ServiceBlock = () =>(
        <VStack gap="8" max className={cls.block}>
            <Text title="Служебная информация" size="xl"/>
            <HStack gap="8">
                <Text text={'GUID:'} thin/>
                <Text text={person.id} thin/>
            </HStack>
            <HStack gap="8">
                <Text text={'Табельный номер сотрудника:'} thin/>
                <Text text={person.table} thin/>
            </HStack>
            <HStack gap="8">
                <Text text={'Дата устройства на работу:'} thin/>
                <Text text={formatDate(person.employmentDate.toString())} thin/>
            </HStack>
        </VStack>
    )

    const PersonDetalesBlock = () => (
        <Card border='border-slightly' padding='16' max>
            <VStack gap="8" max className={cls.block}>
                <Text title="Детализация сотрудника" size="xl"/>
                <HStack gap="8">
                    <Text text={'Оборудование:'} thin/>
                    <Text text={personDetales.items} thin/>
                </HStack>
                <HStack gap="8">
                    <Text text={'Техника:'} thin/>
                    <Text text={personDetales.hardware} thin/>
                </HStack>
                <HStack gap="8">
                    <Text text={'Програмное обеспечение:'} thin/>
                    <Text text={personDetales.software} thin/>
                </HStack>
                <HStack gap="8">
                    <Text text={'Пройденные курсы:'} thin/>
                    <Text text={personDetales.exams} thin/>
                </HStack>
            </VStack>
        </Card>
    )

    return (
        <VStack gap="16" max className={classNames(cls.PersonFullView, {}, [className])}>
            <ServiceBlock />
            <Card border='border-slightly' padding='16' max>
                <HStack max gap='32' className={cls.block}>
                    <VStack 
                        align='center'
                        justify='center'
                        style={{'backgroundColor': getColor(person.id)}}
                        className={cls.photo}
                    >
                        {getInitials(person.name)}
                    </VStack>
                
                    <VStack gap="8" max>
                        <Text title="Общая информация" size="xl"/>
                    
                        <HStack gap="4" max>
                            <Text text={'Имя'} thin className={cls.text}/>
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
                            <Text text="Телефон:" thin className={cls.text}/>
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
                            <Text title="Расположение" thin className={cls.text}/>
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
                            <Text title="Должность" thin className={cls.text}/>
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
                            <Text title="Email" thin className={cls.text}/>
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
                            <Text title="Дата рождения" thin withoutWrap className={cls.text}/>
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

                <VStack className={cls.block}>
                    <VStack gap="8" >
                        <Text title="Дополнительные настройки" size="xl"/>
                        <Toggle 
                            label="Начальник отдела" 
                            value={person.isChef}
                            onChange={(e) => (console.log('photoChanged: ' + e))}
                            readonly={!isEdit}
                        />
                    
                        <Toggle 
                            label="Менеджер отдела" 
                            value={person.isManager}
                            onChange={(e) => (console.log('photoChanged: ' + e))}
                            readonly={!isEdit}
                        />
                    </VStack>
                </VStack>
            </Card>

            <PersonDetalesBlock />

            <HStack justify="end" align="center" gap="16" max>
                {isEdit && <Button disabled>Сохранить</Button>}
                {isEdit && <Button onClick={onEditToggle}>
                    Отмена
                </Button>}
                {!isEdit && <Button onClick={onEditToggle}>
                    Редактировать
                </Button>}
            </HStack>
        </VStack>
    );
});
