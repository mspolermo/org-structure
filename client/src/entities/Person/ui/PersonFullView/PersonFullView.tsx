import { observer } from 'mobx-react';
import { useCallback  } from "react";
import { useNavigate } from "react-router-dom";

import { classNames } from '@/shared/lib/classNames/classNames';
import { getColor } from '@/shared/lib/getColors/getColors';
import { getInitials } from '@/shared/lib/getInitials/getInitials';
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Toggle } from "@/shared/ui/Toggle";

import cls from './PersonFullView.module.scss';
import { Person } from '../../model/types/person';

interface PersonFullViewProps {
	className?: string;
    person: Person;
}

export const PersonFullView = observer(({ className, person }: PersonFullViewProps) => {
    const {id, table, employmentDate, birthday, email, name, phone, location , post, isChef, isManager } = person
    
    const navigate = useNavigate();

    const onReturnHandler = useCallback(() =>navigate(-1), [navigate]);

    const ServiceBlock = () =>(
        <VStack gap="8" max className={cls.block}>
            <Text title="Служебная информация" size="xl"/>
            <HStack gap="8">
                <Text text={'GUID:'} thin/>
                <Text text={id} thin/>
            </HStack>
            <HStack gap="8">
                <Text text={'Табельный номер сотрудника:'} thin/>
                <Text text={table} thin/>
            </HStack>
            <HStack gap="8">
                <Text text={'Дата устройства на работу:'} thin/>
                <Text text={employmentDate.toString()} thin/>
            </HStack>
        </VStack>
    )

    return (
        <VStack gap="16" max className={classNames(cls.PersonFullView, {}, [className])}>
            <ServiceBlock />
            <HStack max gap='32' className={cls.block}>
                <VStack 
                    align='center'
                    justify='center'
                    style={{'backgroundColor': getColor(id)}}
                    className={cls.photo}
                >
                    {getInitials(name)}
                </VStack>
                
                <VStack gap="8" max>
                    <Text title="Общая информация" size="xl"/>
                    
                    <HStack gap="16" max>
                        <Text text={'Имя'} thin/>
                        <Input inputVariant="clear" className={cls.input} placeholder="ФИО сотрудника" value={name}/>
                    </HStack>
                    <HStack gap="4" max>
                        <Text text="Телефон:" thin/>
                        <Input inputVariant="clear" className={cls.input} placeholder="Номер телефона" value={phone}/>
                    </HStack>
                    <HStack gap="4" max>
                        <Text title="Расположение" thin/>
                        <Input inputVariant="clear" className={cls.input} placeholder="Расположение" value={location}/>
                    </HStack>
                    <HStack gap="4" max>
                        <Text title="Должность" thin/>
                        <Input inputVariant="clear" className={cls.input} placeholder="Должность" value={post}/>
                    </HStack>
                    <HStack gap="4" max>
                        <Text title="Email" thin/>
                        <Input inputVariant="clear" className={cls.input} placeholder="Почтовый адрес" value={email}/>
                    </HStack>
                    <HStack gap="4" max>
                        <Text title="Дата рождения" thin />
                        <Input inputVariant="clear" className={cls.input} placeholder="Должность" value={birthday.toString()}/>
                    </HStack>
                </VStack>
            </HStack>

            <VStack className={cls.block}>
                <VStack gap="8" >
                    <Text title="Дополнительные настройки" size="xl"/>
                    <Toggle 
                        label="Начальник отдела" 
                        value={isChef}
                        onChange={(e) => (console.log('photoChanged: ' + e))}
                    />
                    
                    <Toggle 
                        label="Менеджер отдела" 
                        value={isManager}
                        onChange={(e) => (console.log('photoChanged: ' + e))}
                    />
                </VStack>
            </VStack>
            
            <HStack justify="end" align="center" gap="16" max>
                <Button disabled>Сохранить</Button>
                <Button onClick={onReturnHandler}>
                    Отмена
                </Button>
            </HStack>
        </VStack>
    );
});
