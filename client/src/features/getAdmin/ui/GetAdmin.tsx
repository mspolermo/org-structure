import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import { fetchUserNav, UserNavType } from '@/entities/Navigation';
import {
    deleteUser,
    deleteUserRole,
    getAllUserRoles,
    getAllUsers,
    User,
    UserRole,
    UserRolesList,
    UsersList
} from '@/entities/User'
import { Button } from "@/shared/ui/Button";
import { ListBoxItem } from '@/shared/ui/Popups';
import RemoveModal from '@/shared/ui/RemoveModal/RemoveModal';
import { HStack, VStack } from "@/shared/ui/Stack";

import { CreateOrgUnitModalAsync as CreateOrgUnitModal } from './createOrgUnitModal/CreateOrgUnitModal.async';
import { CreatePersonModalAsync as CreatePersonModal } from './createPersonModal/CreatePersonModal.async';
import CreateRoleModal from './createRoleModal/CreateRoleModal';
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
    const [isCreateRoleModal, setIsCreateRoleModal] = useState(false);
    const [isDeleteRoleModal, setIsDeleteRoleModal] = useState(false);
    const [deleteRoleValue, setDeleteRoleValue] = useState('')

    const [isDeleteUserModal, setIsDeleteUserModal] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState('')

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
        case 'createRole':
            setIsCreateRoleModal(flag)
            break
        case 'removeRole':
            setIsDeleteRoleModal(flag)
            break
        case 'removeUser':
            setIsDeleteUserModal(flag)
            break
        }
    }, []);

    const openDeleteRoleModal = useCallback((value: string) => {
        setDeleteRoleValue(value)
        onModalAction('removeRole', 'open')
    },[onModalAction])

    const openDeleteUserModal = useCallback((id: string) => {
        setDeleteUserId(id)
        onModalAction('removeUser', 'open')
    },[onModalAction])

    const deleteRoleHandler = useCallback(async()=>{
        try {
            await deleteUserRole(deleteRoleValue)
            await fetchUserRoles()
        } catch (e) {
            console.error("Ошибка при удалении роли пользователя:", e);
            if (e instanceof Error) {
                throw new Error(e.message)
            } else {
                throw new Error("Неизвестная ошибка")
            }
        } 
    }, [deleteRoleValue, fetchUserRoles])

    const deleteUserHandler = useCallback(async()=>{
        if(!rootStore.auth) return

        try {
            await deleteUser(rootStore.auth, deleteUserId)
            await fetchUsers()
        } catch (e) {
            console.error("Ошибка при удалении пользователя:", e);
            if (e instanceof Error) {
                throw new Error(e.message)
            } else {
                throw new Error("Неизвестная ошибка")
            }
        } 
    }, [deleteUserId, fetchUsers, rootStore.auth])

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
            </HStack>

            <UserRolesList
                onCreate={() => onModalAction('createRole', 'open')}
                onDelete={openDeleteRoleModal}
                userRoles={userRoles} 
            />

            <UsersList
                onCreate={() => onModalAction('createUser', 'open')}
                onDelete={openDeleteUserModal}
                users={users}
            />

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

            <CreateRoleModal 
                updateRolesList={fetchUserRoles}
                isOpen={isCreateRoleModal}
                onCloseModal={() => onModalAction('createRole', 'close')}
            />

            <RemoveModal
                onDelete={deleteRoleHandler}
                isOpen={isDeleteRoleModal}
                onCloseModal={() => onModalAction('removeRole', 'close')}
            />

            <RemoveModal
                onDelete={deleteUserHandler}
                isOpen={isDeleteUserModal}
                onCloseModal={() => onModalAction('removeUser', 'close')}
            />

        </VStack>
    );
});

export default GetAdmin;
