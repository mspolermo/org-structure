import { memo, useCallback, useState, useEffect} from 'react';

import { createPerson, PersonCreateData } from '@/entities/Person';
import { classNames } from '@/shared/lib/classNames/classNames';
import { formatDateToISO } from '@/shared/lib/formatDate/formatDate';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { Modal } from '@/shared/ui/Modal';
import { ListBox, ListBoxItem } from '@/shared/ui/Popups';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Toggle } from '@/shared/ui/Toggle';

import cls from './CreatePersonModal.module.scss';

interface Props {
	className?: string;
    isOpen: boolean;
    onCloseModal: () => void;
    orgUnitsList: ListBoxItem<string>[]
}

const CreatePersonModal = memo((props: Props) => {
    const { className, onCloseModal, isOpen, orgUnitsList } = props
    const [closingStatus, setClosingStatus] = useState(false);

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
    

    useEffect(() => {
        setClosingStatus(false)
    }, [closingStatus]);

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

    const createHandler = useCallback(async () => {
        const data: PersonCreateData = {
            name,
            phone: phone || null,
            location,
            post,
            email,
            birthday: new Date(formatDateToISO(birthday)),
            isChef,
            isManager,
            orgUnitId: orgUnitId,
            table: table || null,
            employmentDate: new Date(formatDateToISO(employmentDate))
        }


        await createPerson({...data})
        setClosingStatus(true)
        //TODO: добавить вывод ошибки если что-то пошло не так
        resetToDefault()
    }, [birthday, email, employmentDate, isChef, isManager, location, name, orgUnitId, phone, post, resetToDefault, table]);

    const closingHandler = useCallback(() => {
        setClosingStatus(true)
        resetToDefault()
    }, [resetToDefault]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onCloseModal}
            lazy
            className={classNames(cls.OpenPrintModal, {}, [className ])}
            closeStatus={closingStatus}
        >
            <VStack gap='24' justify='between'>


                <Text title='Создание сотрудника' size="xl"/>
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
                                    placeholder="Дата устройства на работу"
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

                <HStack justify="end" align="center" gap='16' max>
                    <Button onClick={createHandler} variant='outline-inverted' className={cls.btn}>Создать</Button>
                    <Button onClick={closingHandler} variant='outline-inverted' className={cls.btn}>Закрыть</Button>
                </HStack>
            </VStack>
        </Modal>
    );
});

export default CreatePersonModal;