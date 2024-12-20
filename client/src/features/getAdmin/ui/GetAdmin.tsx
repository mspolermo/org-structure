import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';

import { CrossInsideCircle, Pencil, PlusInsideCircle } from "@/shared/assets/svg-icons/status";
import { Button } from "@/shared/ui/Button";
import { Icon } from "@/shared/ui/Icon";
import { Input } from "@/shared/ui/Input";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";

import { CreateOrgUnitModalAsync as CreateOrgUnitModal } from './createOrgUnitModal/CreateOrgUnitModal.async';
import { CreatePersonModalAsync as CreatePersonModal } from './createPersonModal/CreatePersonModal.async';
import cls from './GetAdmin.module.scss';
import UserRolesList from './userRolesList/UserRolesList';
import { modalAdminActionType, modalAdminType } from '../model/types/types';
import { getAllUserRoles, UserRole } from '@/entities/User';

const GetAdmin = observer(() => {

    const [userRoles, setUserRoles] = useState<UserRole[]>()
    const [isCreatePersonModal, setIsCreatePersonModal] = useState(false);
    const [isCreateOrgUnitModal, setIsCreateOrgUnitModal] = useState(false);

    const onModalAction = useCallback((type: modalAdminType, action: modalAdminActionType) => {
        const flag = action == 'open' ? true : false;

        switch (type) {
        case 'createPerson':
            setIsCreatePersonModal(flag);
            break
        case 'createOrgUnit':
            setIsCreateOrgUnitModal(flag)
            break
        }

    }, []);

    const fetchUserRoles = useCallback(async () => {
        try {
            const response = await getAllUserRoles()
            setUserRoles(response)
        } catch (e) {
            console.log('Ошибка зашрузки ролей пользователя: ', e)
        }
    }, [])

    useEffect(() => {
        fetchUserRoles()
    }, [])

    return (
        <VStack gap="32" max>

            <HStack gap="8">
                <Button onClick={() => onModalAction('createOrgUnit', 'open')} >
                    Создать отдел
                </Button>
                <Button onClick={() => onModalAction('createPerson', 'open')} >
                    Добавить сотрудника
                </Button>

            </HStack>

            <UserRolesList userRoles={userRoles} />

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

            <CreatePersonModal
                isOpen={isCreatePersonModal}
                onCloseModal={() => onModalAction('createPerson', 'close')}
            />

            <CreateOrgUnitModal
                isOpen={isCreateOrgUnitModal}
                onCloseModal={() => onModalAction('createOrgUnit', 'close')}
            />

        </VStack>
    );
});

export default GetAdmin;
