import { observer } from 'mobx-react';
import { useCallback  } from "react";
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

    const onReturnHandler = useCallback(() =>navigate(-1), [navigate]);

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

    const PersonBlock = () => (
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
                    
                    <HStack gap="16" max>
                        <Text text={'Имя'} thin/>
                        <Input inputVariant="clear" className={cls.input} placeholder="ФИО сотрудника" value={person.name}/>
                    </HStack>
                    <HStack gap="4" max>
                        <Text text="Телефон:" thin/>
                        <Input inputVariant="clear" className={cls.input} placeholder="Номер телефона" value={person.phone}/>
                    </HStack>
                    <HStack gap="4" max>
                        <Text title="Расположение" thin/>
                        <Input inputVariant="clear" className={cls.input} placeholder="Расположение" value={person.location}/>
                    </HStack>
                    <HStack gap="4" max>
                        <Text title="Должность" thin/>
                        <Input inputVariant="clear" className={cls.input} placeholder="Должность" value={person.post}/>
                    </HStack>
                    <HStack gap="4" max>
                        <Text title="Email" thin/>
                        <Input inputVariant="clear" className={cls.input} placeholder="Почтовый адрес" value={person.email}/>
                    </HStack>
                    <HStack gap="4" max>
                        <Text title="Дата рождения" thin withoutWrap />
                        <Input
                            inputVariant="clear"
                            className={cls.input}
                            placeholder="Должность"
                            value={formatDate(person.birthday.toString())}
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
                    />
                    
                    <Toggle 
                        label="Менеджер отдела" 
                        value={person.isManager}
                        onChange={(e) => (console.log('photoChanged: ' + e))}
                    />
                </VStack>
            </VStack>
        </Card>
    )

    return (
        <VStack gap="16" max className={classNames(cls.PersonFullView, {}, [className])}>
            <ServiceBlock />
            <PersonBlock />
            <PersonDetalesBlock />
            
            <HStack justify="end" align="center" gap="16" max>
                <Button disabled>Сохранить</Button>
                <Button onClick={onReturnHandler}>
                    Отмена
                </Button>
            </HStack>
        </VStack>
    );
});
