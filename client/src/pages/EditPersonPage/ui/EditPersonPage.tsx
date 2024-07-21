import { memo, useCallback  } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { CrossInsideCircle, Pencil, PlusInsideCircle } from "@/shared/assets/svg-icons/status";
import { AppLink } from "@/shared/ui/AppLink";
import { Button } from "@/shared/ui/Button";
import { Icon } from "@/shared/ui/Icon";
import { Input } from "@/shared/ui/Input";
import { Skeleton } from "@/shared/ui/Skeleton";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Toggle } from "@/shared/ui/Toggle";
import { Page } from "@/widgets/Page";

import cls from './EditPersonPage.module.scss';

const EditPersonPage = memo(() => {
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();

    const onReturnHandler = useCallback(() =>navigate(-1), [navigate]);

    const editPageLayout = (
        <VStack gap="16" max>
            <VStack gap="8" className={cls.block}>
                <Text title="Общая информация" size="xl"/>
                <HStack gap="16" max>
                    <Text text={'Имя'} thin/>
                    <Skeleton height={20} width={300}/>
                </HStack>
                <HStack gap="16" max>
                    <Text text={'GUID'} thin/>
                    <Text text={id} />
                </HStack>
            </VStack>
            <VStack gap="8" className={cls.block}>
                <Text title="Фото" size="xl"/>
                <VStack gap="8" className={cls.toggleBlock}>
                    <VStack className={cls.photo}>
                        <AppLink to={''} variant='blue' className={cls.link}>Добавить</AppLink>
                    </VStack>
                    <Toggle 
                        label="Использовать самое последнее фото" 
                        value={false}
                        onChange={(e) => (console.log('photoChanged: ' + e))}
                    />
                </VStack>
            </VStack>
            <VStack gap="8" className={cls.block}>
                <Text title="Телефоны" size="xl"/>
                <HStack gap="4">
                    <Input inputVariant="clear" className={cls.input} placeholder="Номер"/>
                    <Button onClick={() => {}} className={cls.btn}>
                        <Icon Svg={PlusInsideCircle} className={cls.icon}/>
                    </Button>
                    <Button onClick={() => {}} className={cls.btn}>
                        <Icon Svg={CrossInsideCircle} className={cls.icon}/>
                    </Button>
                </HStack>
            </VStack>
            <VStack gap="8" className={cls.block}>
                <Text title="Расположение" size="xl"/>
                <HStack gap="4">
                    <Input inputVariant="clear" className={cls.input} placeholder="Корпус"/>
                    <Input inputVariant="clear" className={cls.input} placeholder="Тип"/>
                    <Input inputVariant="clear" className={cls.input} placeholder="Комната"/>
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
                    <Text title="Назначения" size="xl"/>
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
                <Text title="Роли" size="xl"/>
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
            <VStack gap="8" className={cls.block}>
                <Text title="Функциональные подчинения" size="xl"/>
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
            <VStack gap="8" className={cls.block}>
                <Text title="Отсутствие" size="xl"/>
                <HStack gap="4">
                    <Input inputVariant="clear" className={cls.input} placeholder="Отсутствует"/>
                    <Input inputVariant="clear" className={cls.input} placeholder="Дата"/>
                    <Input inputVariant="clear" className={cls.input} placeholder="Дата"/>
                    <Button onClick={() => {}} className={cls.btn}>
                        <Icon Svg={PlusInsideCircle} className={cls.icon}/>
                    </Button>
                    <Button onClick={() => {}} className={cls.btn}>
                        <Icon Svg={CrossInsideCircle} className={cls.icon}/>
                    </Button>
                </HStack>
            </VStack>
            <VStack className={cls.block}>
                <VStack gap="8" className={cls.toggleBlock}>
                    <Text title="Дополнительные настройки" size="xl"/>
                    <Toggle 
                        label="Сервис просмотра фотографий" 
                        value={false}
                        onChange={(e) => (console.log('photoChanged: ' + e))}
                    />
                        
                    <Toggle 
                        label="Сервис просмотра дат рождения" 
                        value={false}
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
    )
    
    return (
        <Page header="Страница редактирования информации о пользователе">
            {editPageLayout}
        </Page>
    );
});

export default EditPersonPage;
