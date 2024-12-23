import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import { fetchUserNav, UserNavType } from '@/entities/Navigation';
import {
    getAllUserRoles,
    getAllUsers,
    User,
    UserRole,
    UserRolesList,
    UsersList
} from '@/entities/User'
import { Button } from "@/shared/ui/Button";
import { ListBoxItem } from '@/shared/ui/Popups';
import { HStack, VStack } from "@/shared/ui/Stack";

import { CreateOrgUnitModalAsync as CreateOrgUnitModal } from './createOrgUnitModal/CreateOrgUnitModal.async';
import { CreatePersonModalAsync as CreatePersonModal } from './createPersonModal/CreatePersonModal.async';
import { CreateUserModalAsync as CreateUserModal } from './createUserModal/CreateUserModal.async';
import { gerOrgUnitsOptions } from '../model/lib/gerOrgUnitsOptions';
import { modalAdminActionType, modalAdminType } from '../model/types/types';

const GetAdmin = observer(() => {
    const {rootStore} = useStoreProvider();

    const [userRoles, setUserRoles] = useState<UserRole[]>()
    const [users, setUsers] = useState<User[]>()
    const [isCreatePersonModal, setIsCreatePersonModal] = useState(false);
    const [isCreateOrgUnitModal, setIsCreateOrgUnitModal] = useState(false);
    const [isCreateUserModal, setIsCreateUserModal] = useState(false);
    const [userNav, setUserNav] = useState<UserNavType>()

    const orgUnitsDataList: ListBoxItem<string>[] = gerOrgUnitsOptions(userNav, false)
    const orgUnitsList: ListBoxItem<string>[] = gerOrgUnitsOptions(userNav, true)

    const updateUserNav = useCallback(async () => {
        if (!rootStore.auth) return;
    
        try {
            await fetchUserNav(rootStore, rootStore.auth);

            
            if (rootStore.userNavData) {
                const value = await rootStore.userNavData;
                setUserNav(value);
            }
        } catch (e) {
            console.error("Ошибка при обновлении избранного:", e);
        }
    }, [rootStore]);

    const fetchUserRoles = useCallback(async () => {
        try {
            const response = await getAllUserRoles()
            setUserRoles(response)
        } catch (e) {
            console.log('Ошибка загрузки ролей пользователя: ', e)
        }
    }, [])

    const fetchUsers = useCallback(async () => {
        try {
            const response = await getAllUsers()
            setUsers(response)
        } catch (e) {
            console.log('Ошибка зашрузки списка пользователей: ', e)
        }
    }, [])

    const onModalAction = useCallback((type: modalAdminType, action: modalAdminActionType) => {
        const flag = action == 'open' ? true : false;

        switch (type) {
        case 'createUser':
            setIsCreateUserModal(flag)
            break
        case 'createPerson':
            setIsCreatePersonModal(flag);
            break
        case 'createOrgUnit':
            setIsCreateOrgUnitModal(flag)
            break
        }

    }, []);

    useEffect(() => {
        updateUserNav()
        fetchUserRoles()
        fetchUsers()
    }, [fetchUserRoles, fetchUsers, updateUserNav])

    return (
        <VStack gap="32" max>

            <HStack gap="8">
                <Button onClick={() => onModalAction('createOrgUnit', 'open')} >
                    Создать отдел
                </Button>
                <Button onClick={() => onModalAction('createPerson', 'open')} >
                    Добавить сотрудника
                </Button>
                <Button onClick={() => onModalAction('createUser', 'open')} >
                    Создать пользователя
                </Button>
            </HStack>

            <UserRolesList userRoles={userRoles} />

            <UsersList users={users}/>

            <CreateOrgUnitModal
                orgUnitsList={orgUnitsList}
                isOpen={isCreateOrgUnitModal}
                onCloseModal={() => onModalAction('createOrgUnit', 'close')}
                updateUserNav={updateUserNav}
            />

            <CreatePersonModal
                orgUnitsList={orgUnitsDataList}
                isOpen={isCreatePersonModal}
                onCloseModal={() => onModalAction('createPerson', 'close')}
            />

            <CreateUserModal
                updateUsersList={fetchUsers}
                isOpen={isCreateUserModal}
                onCloseModal={() => onModalAction('createUser', 'close')}
            />

        </VStack>
    );
});

export default GetAdmin;
