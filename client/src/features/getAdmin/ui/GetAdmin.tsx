import { observer } from 'mobx-react-lite';

import { CrossInsideCircle, Pencil, PlusInsideCircle } from "@/shared/assets/svg-icons/status";
import { Button } from "@/shared/ui/Button";
import { Icon } from "@/shared/ui/Icon";
import { Input } from "@/shared/ui/Input";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";

import cls from './GetAdmin.module.scss';

const GetAdmin = observer(() => {

    return (
        <VStack gap="32" max>

            <HStack gap="8">
                <Button onClick={() => console.log('modal open')} >
                    Создать отдел
                </Button>
                <Button onClick={() => console.log('modal open')} >
                    Добавить сотрудника
                </Button>

            </HStack>

            <VStack gap="16" className={cls.block}>
                <Text title="Роли пользователя" size="xl"/>
                <HStack gap="4">
                    <Input inputVariant="clear" className={cls.input} placeholder="Название"/>
                    <Input inputVariant="clear" className={cls.input} placeholder="Описание"/>
                </HStack>
            </VStack>

            <VStack gap="16" className={cls.block}>
                <HStack gap="4">
                    <Text title="Пользователи" size="xl"/>
                    <Button onClick={() => console.log('modal open')} className={cls.btn}>
                        <Icon Svg={PlusInsideCircle} className={cls.icon}/>
                    </Button>
                </HStack>
                <HStack gap="4">
                    <Input inputVariant="clear" className={cls.input} placeholder="UserId"/>
                    <Input inputVariant="clear" className={cls.input} placeholder="Email"/>
                    <Input inputVariant="clear" className={cls.input} placeholder="ФИО"/>
                    <Input inputVariant="clear" className={cls.input} placeholder="Роли пользователя"/>
                    <Input inputVariant="clear" className={cls.input} placeholder="Пароль"/>
                    <Button onClick={() => {}} className={cls.btn}>
                        <Icon Svg={Pencil} className={cls.icon}/>
                    </Button>
                    <Button onClick={() => {}} className={cls.btn}>
                        <Icon Svg={CrossInsideCircle} className={cls.icon}/>
                    </Button>
                </HStack>
            </VStack>

        </VStack>
    );
});

export default GetAdmin;
