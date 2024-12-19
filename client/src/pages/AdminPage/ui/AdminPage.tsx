import { observer } from 'mobx-react-lite';

import { CrossInsideCircle, Pencil, PlusInsideCircle } from "@/shared/assets/svg-icons/status";
import { Button } from "@/shared/ui/Button";
import { Icon } from "@/shared/ui/Icon";
import { Input } from "@/shared/ui/Input";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Toggle } from "@/shared/ui/Toggle";
import { Page } from "@/widgets/Page";

import cls from './AdminPage.module.scss';

const AdminPage = observer(() => {

    return (
        <Page header='Страница администрирования'>
            
            <VStack gap="16" max>
                <VStack gap="8" className={cls.block}>
                    <Text title="Пользователи" size="xl"/>
                    <HStack gap="4">
                        <Input inputVariant="clear" className={cls.input} placeholder="UserId"/>
                        <Input inputVariant="clear" className={cls.input} placeholder="Email"/>
                        <Input inputVariant="clear" className={cls.input} placeholder="PersonId"/>
                        <Input inputVariant="clear" className={cls.input} placeholder="Роли пользователя"/>
                        <Button onClick={() => {}} className={cls.btn}>
                            <Icon Svg={PlusInsideCircle} className={cls.icon}/>
                        </Button>
                        <Button onClick={() => {}} className={cls.btn}>
                            <Icon Svg={CrossInsideCircle} className={cls.icon}/>
                        </Button>
                    </HStack>
                </VStack>
                <VStack gap="8" className={cls.block}>
                    <Text title="Роли пользователя" size="xl"/>
                    <HStack gap="4">
                        <Input inputVariant="clear" className={cls.input} placeholder="Название"/>
                        <Input inputVariant="clear" className={cls.input} placeholder="Описание"/>
                        <Button onClick={() => {}} className={cls.btn}>
                            <Icon Svg={PlusInsideCircle} className={cls.icon}/>
                        </Button>
                        <Button onClick={() => {}} className={cls.btn}>
                            <Icon Svg={CrossInsideCircle} className={cls.icon}/>
                        </Button>
                    </HStack>
                </VStack>
                <VStack gap="8" className={cls.block}>
                    <HStack gap="4">
                        <Text title="Сотрудники" size="xl"/>
                        <Button onClick={() => console.log('modal open')} className={cls.btn}>
                            <Icon Svg={PlusInsideCircle} className={cls.icon}/>
                        </Button>
                    </HStack>
                    <VStack className={cls.toggleBlockMin}>
                        <Toggle 
                            label="Показывать неактивные" 
                            value={false}
                            onChange={(e) => (console.log('photoChanged: ' + e))}
                        />
                    </VStack>
                    <HStack gap="4">
                        <Input inputVariant="clear" className={cls.input} placeholder="Дата назначения" readonly/>
                        <Input inputVariant="clear" className={cls.input} placeholder="IsMain" readonly/>
                        <Input inputVariant="clear" className={cls.input} placeholder="Должность"readonly/>
                        <Input inputVariant="clear" className={cls.input} placeholder="OrgUnit" readonly/>
                        <Button onClick={() => console.log('modal open')} className={cls.btn}>
                            <Icon Svg={Pencil} className={cls.icon}/>
                        </Button>
                        <Button onClick={() => {}} className={cls.btn}>
                            <Icon Svg={CrossInsideCircle} className={cls.icon}/>
                        </Button>
                    </HStack>
                </VStack>

                <VStack gap="8" className={cls.block}>
                    <HStack gap="4">
                        <Text title="Отделы" size="xl"/>
                        <Button onClick={() => console.log('modal open')} className={cls.btn}>
                            <Icon Svg={PlusInsideCircle} className={cls.icon}/>
                        </Button>
                    </HStack>
                    <VStack className={cls.toggleBlockMin}>
                        <Toggle 
                            label="Показывать неактивные" 
                            value={false}
                            onChange={(e) => (console.log('photoChanged: ' + e))}
                        />
                    </VStack>
                    <HStack gap="4">
                        <Input inputVariant="clear" className={cls.input} placeholder="Тип связи"/>
                        <Input inputVariant="clear" className={cls.input} placeholder="Тип объекта"/>
                        <Input inputVariant="clear" className={cls.input} placeholder="Объект"/>
                        <Input inputVariant="clear" className={cls.input} placeholder="Тип зависимого"/>
                        <Input inputVariant="clear" className={cls.input} placeholder="Зависимый объект"/>
                        <Button onClick={() => {}} className={cls.btn}>
                            <Icon Svg={PlusInsideCircle} className={cls.icon}/>
                        </Button>
                        <Button onClick={() => {}} className={cls.btn}>
                            <Icon Svg={CrossInsideCircle} className={cls.icon}/>
                        </Button>
                    </HStack>
                </VStack>
            </VStack>
        </Page>
    );
});

export default AdminPage;
